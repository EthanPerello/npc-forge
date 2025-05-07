// src/app/api/proxy-image/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 30; // Set max duration to 30 seconds

export async function GET(request: NextRequest) {
  // Get the URL to proxy from the query parameter
  const urlParam = request.nextUrl.searchParams.get('url');
  
  if (!urlParam) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }
  
  try {
    console.log(`Image proxy request for: ${urlParam}`);
    
    // Decode the URL if it's encoded
    const imageUrl = decodeURIComponent(urlParam);
    
    // Fetch the image from the source (server-side, no CORS issues)
    const response = await fetch(imageUrl, {
      headers: {
        // Some services require user-agent to be set to avoid 403 errors
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`Proxy fetch failed: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: `Failed to fetch image: ${response.status} ${response.statusText}` },
        { status: response.status }
      );
    }
    
    // Get the image data as an ArrayBuffer
    const imageData = await response.arrayBuffer();
    
    // Convert to base64
    const base64Image = Buffer.from(imageData).toString('base64');
    
    // Determine MIME type
    const contentType = response.headers.get('content-type') || 'image/png';
    
    // Create a data URL
    const dataUrl = `data:${contentType};base64,${base64Image}`;
    
    // Return the data URL directly
    return NextResponse.json({ imageData: dataUrl });
  } catch (error) {
    console.error('Error in image proxy:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}