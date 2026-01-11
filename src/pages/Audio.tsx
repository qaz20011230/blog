import React from 'react';
import { getAllAudios } from '../lib/content';
import { format } from 'date-fns';
import { Play } from 'lucide-react';

export default function Audio() {
  const audios = getAllAudios();

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Audio Collection</h1>
        <p className="text-lg text-gray-600">
          Listen to my thoughts, music, and experiments with sound.
        </p>
      </header>

      <div className="space-y-8">
        {audios.map((item) => (
          <article key={item.slug} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                <Play size={24} />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h2>
                <div className="text-sm text-gray-500 mb-4">
                  {format(new Date(item.date), 'MMMM d, yyyy')}
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="w-full">
                  <audio controls className="w-full">
                    <source src={item.src} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </div>
          </article>
        ))}

        {audios.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <p className="text-gray-500">No audio content available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
