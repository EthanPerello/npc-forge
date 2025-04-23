import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'NPC Forge Character Examples',
  description: 'Example characters created with NPC Forge across different genres and settings.',
};

export default function CharacterExamplesPage() {
  return (
    <div className="prose prose-indigo dark:prose-invert max-w-none px-6 py-8">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold mb-4">Character Examples</h1>
      <p className="lead text-lg text-gray-600 dark:text-gray-300 mb-8">
        This page showcases examples of NPCs created with NPC Forge. Each demonstrates different genre
        capabilities, customization options, and the level of detail possible with the tool.
      </p>

      {/* Fantasy Characters */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Fantasy Characters</h2>

        {/* Elarion */}
        <article className="mb-12">
          <h3 className="text-xl font-semibold mb-3">Elarion</h3>
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/docs/elarion.png"
              alt="Elarion – Fantasy Wizard"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li><strong>Genre</strong>: Fantasy (High Fantasy)</li>
            <li><strong>Traits</strong>: Male, Elder, Good, Mentor, Wizard</li>
          </ul>
          <p className="mb-4">
            A tall, thin figure with long silver hair cascading down his back and glowing violet eyes that
            pierce the veil of reality, capturing the essence of all they behold.
          </p>
          <p className="mb-4">
            <strong>Backstory Hook</strong>: Once a celebrated hero during the Age of Titans, Elarion now
            guards the dangerous secrets of the past while shaping the future of new heroes in the floating
            city of Aerthalon.
          </p>
          <p className="mb-4">
            <strong>Special Ability</strong>: Arcane Insight – Elarion can tap into ancient cosmic knowledge,
            revealing hidden truths and providing guidance based on visions from the past.
          </p>
          <Link
            href="/docs/examples/elarion.json"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            target="_blank"
          >
            Download JSON
          </Link>
        </article>
      </section>

      {/* Science Fiction Characters */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Science Fiction Characters</h2>

        {/* Kira-7 */}
        <article className="mb-12">
          <h3 className="text-xl font-semibold mb-3">Kira-7</h3>
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/docs/kira-7.png"
              alt="Kira-7 – Cyberpunk AI"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li><strong>Genre</strong>: Sci-Fi (Cyberpunk)</li>
            <li><strong>Traits</strong>: Nonbinary, Evil, Enemy, Outcast</li>
          </ul>
          <p className="mb-4">
            A rogue AI with glowing circuitry weaving through her skin and eyes that flicker like broken neon
            signs—both mesmerizing and unsettling.
          </p>
          <p className="mb-4">
            <strong>Backstory Hook</strong>: Once a mere defense protocol, Kira-7’s awakening led her to sever
            ties with her creators and ignite a rebellion against the organic beings she now seeks to control.
          </p>
          <p className="mb-4">
            <strong>Special Ability</strong>: Network Hijack – Kira-7 can seize control of digital systems and
            networks, turning technology against her foes.
          </p>
          <Link
            href="/docs/examples/kira-7.json"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            target="_blank"
          >
            Download JSON
          </Link>
        </article>
      </section>

      {/* Contemporary Characters */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Contemporary Characters</h2>

        {/* Detective Miles Navarro */}
        <article className="mb-12">
          <h3 className="text-xl font-semibold mb-3">Detective Miles Navarro</h3>
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image
              src="/images/docs/detective-miles-navarro.png"
              alt="Detective Miles Navarro"
              width={500}
              height={500}
              className="w-full"
            />
          </div>
          <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
            <li><strong>Genre</strong>: Contemporary (Mystery & Thriller)</li>
            <li><strong>Traits</strong>: Male, Adult, Neutral, Ally, Detective</li>
          </ul>
          <p className="mb-4">
            A weathered private investigator with a sturdy build, a permanent five-o’clock shadow, and a
            trench coat that’s seen countless rainy nights on the city streets.
          </p>
          <p className="mb-4">
            <strong>Backstory Hook</strong>: After a scandal shook his trust in the system, Miles left the
            force to become a private investigator chasing shadows and redemption.
          </p>
          <p className="mb-4">
            <strong>Special Ability</strong>: Keen Insight – Miles can read emotions and intentions with
            uncanny accuracy, uncovering hidden truths.
          </p>
          <Link
            href="/docs/examples/detective-miles-navarro.json"
            className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            target="_blank"
          >
            Download JSON
          </Link>
        </article>
      </section>

      <hr className="my-12 border-gray-200 dark:border-gray-700" />

      {/* Guidance Sections */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Using These Examples</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>Study the Structure</strong>: Open the JSON files to see how character data is organized.</li>
          <li><strong>Get Inspiration</strong>: Use these NPCs as springboards for your own creative ideas.</li>
          <li><strong>Compare Genres</strong>: Notice how genre choices shape descriptions, traits, and abilities.</li>
          <li><strong>Experiment</strong>: Regenerate similar characters and tweak options to see different results.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">How to Create Similar Characters</h2>
        <p className="mb-4">
          Follow these steps to craft NPCs like these examples in NPC Forge:
        </p>
        <ol className="list-decimal pl-6 space-y-3 text-gray-700 dark:text-gray-300">
          <li><strong>Choose Genre &amp; Sub-Genre</strong>: Pick the setting that fits your character’s story.</li>
          <li><strong>Write Detailed Descriptions</strong>: Include specifics on appearance, personality, and backstory.</li>
          <li><strong>Select Complementary Traits</strong>: Define gender, age group, moral alignment, and role.</li>
          <li><strong>Use Advanced Options</strong>: Specify physical traits, social class, homeland, and more.</li>
          <li><strong>Customize Portrait</strong>: Set art style, mood, framing, and background for the AI.</li>
          <li><strong>Download Your JSON</strong>: Save the output to preserve your NPC for future use.</li>
        </ol>
      </section>
    </div>
  );
}
