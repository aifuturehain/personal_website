"use client";

import Image from 'next/image';
import { useState } from 'react';

export default function AIArtGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const artworks = [
    {
      id: 1,
      title: 'Digital Dreamscape',
      description: 'An AI-generated landscape blending natural elements with futuristic architecture.',
      prompt: 'A serene landscape with floating islands, waterfalls, and futuristic buildings integrated with nature, digital art style',
      model: 'Midjourney',
      imagePath: '/images/ai-art/digital-dreamscape.jpg',
    },
    {
      id: 2,
      title: 'Abstract Emotions',
      description: 'A visualization of human emotions through abstract shapes and colors.',
      prompt: 'Abstract representation of human emotions using vibrant colors and flowing shapes',
      model: 'DALL-E',
      imagePath: '/images/ai-art/abstract-emotions.jpg',
    },
    {
      id: 3,
      title: 'Future City',
      description: 'A vision of urban environments in the next century.',
      prompt: 'Futuristic city with vertical gardens, flying vehicles, and sustainable architecture, photorealistic style',
      model: 'Stable Diffusion',
      imagePath: '/images/ai-art/future-city.jpg',
    },
    {
      id: 4,
      title: 'Cosmic Imagination',
      description: 'An exploration of space and cosmic phenomena through AI imagination.',
      prompt: 'Nebula with cosmic structures and celestial bodies in vibrant colors, space art',
      model: 'Midjourney',
      imagePath: '/images/ai-art/cosmic-imagination.jpg',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">AI Art Gallery</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        A collection of artwork created using various AI image generation models. Each piece includes the prompt used to generate it.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="card overflow-hidden">
            <div className="h-64 relative">
              <Image 
                src={artwork.imagePath}
                alt={artwork.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{artwork.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{artwork.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Prompt</h3>
                <p className="text-sm italic bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  "{artwork.prompt}"
                </p>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {artwork.model}
                </span>
                <button 
                  onClick={() => setSelectedArtwork(artwork)}
                  className="text-primary hover:underline"
                >
                  View Full Size
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Size Image Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{selectedArtwork.title}</h3>
              <button 
                onClick={() => setSelectedArtwork(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="relative h-[60vh] bg-gray-100 dark:bg-gray-900">
              <Image 
                src={selectedArtwork.imagePath}
                alt={selectedArtwork.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Prompt</h4>
                <p className="text-sm italic bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
                  "{selectedArtwork.prompt}"
                </p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded-md">
                  {selectedArtwork.model}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}