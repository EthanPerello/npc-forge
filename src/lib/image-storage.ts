// src/lib/image-storage.ts
import { supabase, STORAGE_CONFIG, isSupabaseAvailable, getStorageUser } from './supabase-client'
import { compressImage, getBase64Size, isValidImageData } from './utils'

// IndexedDB configuration (unchanged for local storage)
const DB_NAME = 'npc-forge-db'
const DB_VERSION = 1
const IMAGE_STORE = 'character-images'

// Image storage result interface
export interface ImageStorageResult {
  url?: string           // Supabase public URL
  localData?: string     // Base64 data for IndexedDB
  source: 'supabase' | 'indexeddb' | 'both'
  compressed: boolean
}

// Image upload options
export interface ImageUploadOptions {
  characterId: string
  userId?: string
  forceLocal?: boolean   // Force IndexedDB storage only
  quality?: 'thumbnail' | 'display' | 'full'
}

/**
 * Initialize the IndexedDB database (unchanged)
 */
async function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = (event) => {
      console.error('Error opening IndexedDB:', event)
      reject('Could not open IndexedDB')
    }

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        db.createObjectStore(IMAGE_STORE)
      }
    }
  })
}

/**
 * Generate unique filename for Supabase Storage
 */
function generateStorageFilename(characterId: string, quality: string = 'display'): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `${characterId}/${quality}-${timestamp}-${random}.webp`
}

/**
 * Convert base64 to blob for upload
 */
function base64ToBlob(base64Data: string, mimeType: string = 'image/webp'): Blob {
  const base64 = base64Data.split(',')[1] || base64Data
  const binary = atob(base64)
  const array = new Uint8Array(binary.length)
  
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i)
  }
  
  return new Blob([array], { type: mimeType })
}

/**
 * Upload image to Supabase Storage
 */
async function uploadToSupabase(
  imageData: string,
  options: ImageUploadOptions
): Promise<{ url: string; filename: string } | null> {
  if (!isSupabaseAvailable()) {
    console.log('Supabase not available, skipping cloud upload')
    return null
  }

  const user = await getStorageUser()
  if (!user) {
    console.log('User not authenticated, skipping cloud upload')
    return null
  }

  try {
    // Compress image based on quality setting
    const qualityConfig = STORAGE_CONFIG.QUALITY_SETTINGS[options.quality || 'display']
    let processedImage = imageData
    
    try {
      processedImage = await compressImage(
        imageData, 
        qualityConfig.width, 
        qualityConfig.quality
      )
      console.log(`Image compressed for quality: ${options.quality}`)
    } catch (error) {
      console.warn('Image compression failed, using original:', error)
    }

    // Convert to blob
    const blob = base64ToBlob(processedImage, 'image/webp')
    
    // Check file size
    if (blob.size > STORAGE_CONFIG.MAX_FILE_SIZE) {
      throw new Error(`Image too large: ${blob.size} bytes (max: ${STORAGE_CONFIG.MAX_FILE_SIZE})`)
    }

    // Generate unique filename
    const filename = generateStorageFilename(options.characterId, options.quality)
    
    // Upload to Supabase Storage
    const { data, error } = await supabase!.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .upload(filename, blob, {
        contentType: 'image/webp',
        upsert: false // Don't overwrite existing files
      })

    if (error) {
      console.error('Supabase upload error:', error)
      return null
    }

    // Get public URL
    const { data: urlData } = supabase!.storage
      .from(STORAGE_CONFIG.BUCKET_NAME)
      .getPublicUrl(filename)

    console.log(`Image uploaded to Supabase: ${filename}`)
    return {
      url: urlData.publicUrl,
      filename: filename
    }

  } catch (error) {
    console.error('Failed to upload to Supabase:', error)
    return null
  }
}

/**
 * Save image to IndexedDB (unchanged logic)
 */
async function saveToIndexedDB(characterId: string, imageData: string): Promise<void> {
  const db = await initDB()
  
  return new Promise((resolve, reject) => {
    try {
      if (!db.objectStoreNames.contains(IMAGE_STORE)) {
        console.error(`Object store ${IMAGE_STORE} not found`)
        reject('Image store not found')
        return
      }
      
      const transaction = db.transaction([IMAGE_STORE], 'readwrite')
      const store = transaction.objectStore(IMAGE_STORE)
      const request = store.put(imageData, characterId)
      
      request.onsuccess = () => {
        console.log(`Image saved to IndexedDB for character ${characterId}`)
        resolve()
      }
      
      request.onerror = (event) => {
        console.error('Error saving to IndexedDB:', event)
        reject('Failed to save to IndexedDB')
      }
    } catch (error) {
      console.error('IndexedDB transaction error:', error)
      reject(error)
    }
  })
}

/**
 * ENHANCED: Save image with hybrid storage (Supabase + IndexedDB)
 */
export async function saveImage(
  characterId: string, 
  imageData: string,
  options: Partial<ImageUploadOptions> = {}
): Promise<ImageStorageResult> {
  if (!characterId) {
    throw new Error('Character ID is required')
  }
  
  if (!imageData || !isValidImageData(imageData)) {
    throw new Error('Valid image data is required')
  }

  const uploadOptions: ImageUploadOptions = {
    characterId,
    quality: 'display',
    ...options
  }

  console.log(`Saving image for character ${characterId}...`)

  const result: ImageStorageResult = {
    source: 'indexeddb',
    compressed: false
  }

  let supabaseSuccess = false
  let indexedDBSuccess = false

  // Try Supabase Storage first (if available and not forced local)
  if (!uploadOptions.forceLocal) {
    try {
      const supabaseResult = await uploadToSupabase(imageData, uploadOptions)
      
      if (supabaseResult) {
        result.url = supabaseResult.url
        result.source = 'supabase'
        supabaseSuccess = true
        console.log('Image uploaded to Supabase Storage')
      }
    } catch (error) {
      console.warn('Supabase upload failed, falling back to IndexedDB:', error)
    }
  }

  // Always save to IndexedDB as backup/offline storage
  try {
    // Compress for IndexedDB if not already compressed
    let localImageData = imageData
    const sizeInMB = getBase64Size(imageData)
    
    if (sizeInMB > 2.0) {
      try {
        localImageData = await compressImage(imageData, 512, 0.6)
        result.compressed = true
        console.log(`Image compressed for IndexedDB: ${sizeInMB.toFixed(2)}MB → ${getBase64Size(localImageData).toFixed(2)}MB`)
      } catch (error) {
        console.warn('Compression failed, using original:', error)
      }
    }

    await saveToIndexedDB(characterId, localImageData)
    result.localData = localImageData
    indexedDBSuccess = true
    console.log('Image saved to IndexedDB')

    // Update source based on what succeeded
    if (supabaseSuccess && indexedDBSuccess) {
      result.source = 'both'
    } else if (!supabaseSuccess && indexedDBSuccess) {
      result.source = 'indexeddb'
    }

  } catch (error) {
    console.error('IndexedDB save failed:', error)
    
    // If both failed, throw error
    if (!supabaseSuccess) {
      throw new Error('Failed to save image to any storage system')
    }
  }

  console.log(`Image save completed with source: ${result.source}`)
  return result
}

/**
 * ENHANCED: Get image with hybrid retrieval
 */
export async function getImage(characterId: string): Promise<string | null> {
  // Try IndexedDB first for fastest access
  try {
    const db = await initDB()
    
    const imageData = await new Promise<string | null>((resolve, reject) => {
      try {
        if (!db.objectStoreNames.contains(IMAGE_STORE)) {
          resolve(null)
          return
        }
        
        const transaction = db.transaction([IMAGE_STORE], 'readonly')
        const store = transaction.objectStore(IMAGE_STORE)
        const request = store.get(characterId)
        
        request.onsuccess = () => {
          resolve(request.result || null)
        }
        
        request.onerror = () => {
          resolve(null)
        }

        // Timeout after 3 seconds
        setTimeout(() => resolve(null), 3000)
      } catch (error) {
        resolve(null)
      }
    })

    if (imageData) {
      console.log(`Image loaded from IndexedDB for character ${characterId}`)
      return imageData
    }

  } catch (error) {
    console.warn('IndexedDB retrieval failed:', error)
  }

  // If IndexedDB failed, could implement Supabase URL-to-base64 conversion here
  // For now, return null and let the component handle loading from URL
  return null
}

/**
 * Delete image from both storage systems
 */
export async function deleteImage(characterId: string): Promise<void> {
  let indexedDBDeleted = false
  let supabaseDeleted = false

  // Delete from IndexedDB
  try {
    const db = await initDB()
    
    await new Promise<void>((resolve, reject) => {
      try {
        if (!db.objectStoreNames.contains(IMAGE_STORE)) {
          resolve()
          return
        }
        
        const transaction = db.transaction([IMAGE_STORE], 'readwrite')
        const store = transaction.objectStore(IMAGE_STORE)
        const request = store.delete(characterId)
        
        request.onsuccess = () => {
          console.log(`Image deleted from IndexedDB for character ${characterId}`)
          indexedDBDeleted = true
          resolve()
        }
        
        request.onerror = (event) => {
          console.error('Error deleting from IndexedDB:', event)
          resolve() // Don't reject, just log
        }
      } catch (error) {
        console.error('IndexedDB delete transaction error:', error)
        resolve()
      }
    })
  } catch (error) {
    console.error('IndexedDB delete failed:', error)
  }

  // Delete from Supabase Storage (if available)
  if (isSupabaseAvailable()) {
    try {
      const user = await getStorageUser()
      if (user) {
        // List all files for this character
        const { data: files, error: listError } = await supabase!.storage
          .from(STORAGE_CONFIG.BUCKET_NAME)
          .list(characterId)

        if (!listError && files && files.length > 0) {
          // Delete all files for this character
          const filePaths = files.map(file => `${characterId}/${file.name}`)
          
          const { error: deleteError } = await supabase!.storage
            .from(STORAGE_CONFIG.BUCKET_NAME)
            .remove(filePaths)

          if (deleteError) {
            console.error('Supabase delete error:', deleteError)
          } else {
            console.log(`Deleted ${filePaths.length} files from Supabase for character ${characterId}`)
            supabaseDeleted = true
          }
        }
      }
    } catch (error) {
      console.error('Supabase delete failed:', error)
    }
  }

  if (!indexedDBDeleted && !supabaseDeleted) {
    console.warn(`Failed to delete image for character ${characterId} from any storage system`)
  }
}

/**
 * Get storage status for a character
 */
export async function getImageStorageStatus(characterId: string): Promise<{
  hasLocal: boolean
  hasCloud: boolean
  cloudUrl?: string
}> {
  const result = {
    hasLocal: false,
    hasCloud: false,
    cloudUrl: undefined as string | undefined
  }

  // Check IndexedDB
  try {
    const localImage = await getImage(characterId)
    result.hasLocal = !!localImage
  } catch (error) {
    console.warn('Failed to check local storage:', error)
  }

  // Check Supabase (if available)
  if (isSupabaseAvailable()) {
    try {
      const user = await getStorageUser()
      if (user) {
        const { data: files, error } = await supabase!.storage
          .from(STORAGE_CONFIG.BUCKET_NAME)
          .list(characterId)

        if (!error && files && files.length > 0) {
          result.hasCloud = true
          // Get URL of the first display quality image found
          const displayFile = files.find(f => f.name.includes('display-')) || files[0]
          if (displayFile) {
            const { data: urlData } = supabase!.storage
              .from(STORAGE_CONFIG.BUCKET_NAME)
              .getPublicUrl(`${characterId}/${displayFile.name}`)
            result.cloudUrl = urlData.publicUrl
          }
        }
      }
    } catch (error) {
      console.warn('Failed to check cloud storage:', error)
    }
  }

  return result
}

/**
 * Legacy function for backwards compatibility
 */
export function generatePlaceholderImage(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
      <rect width="512" height="512" fill="#4F46E5" />
      <circle cx="256" cy="180" r="120" fill="#E5E7EB" />
      <rect x="96" y="340" width="320" height="240" rx="20" fill="#E5E7EB" />
    </svg>
  `
  
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  
  return `data:image/svg+xml,${encoded}`
}

/**
 * Helper to check if IndexedDB is available
 */
export function isIndexedDBAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.indexedDB
}