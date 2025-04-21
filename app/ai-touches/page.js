"use client";
import Link from 'next/link';
import Image from 'next/image';

export default function AITouches() {
  const aiProjects = [
    {
      id: 1,
      title: 'AI-Generated Art Gallery',
      description: 'A collection of artwork created using various AI models like DALL-E, Midjourney, and Stable Diffusion.',
      image: '/images/ai-art-placeholder.jpg.webp',
    },
    {
      id: 2,
      title: 'Customer Service Chatbot Demo',
      description: 'An interactive demonstration of how AI chatbots can handle common customer service scenarios.',
      image: '/images/chatbot-placeholder.jpg.webp',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">AI Touches</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        Exploring the creative and practical applications of artificial intelligence.
      </p>
      
      <div className="grid gap-8 md:grid-cols-2">
        {aiProjects.map((project) => (
          <div key={project.id} className="card overflow-hidden">
            <div className="h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              {/* Placeholder text removed */}
              {/* Images now displayed from public/images/ directory */}
              <Image 
                src={project.image}
                alt={project.title}
                width={400}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              <Link href={project.id === 1 ? '/ai-touches/ai-art-gallery' : '/ai-touches/chatbot-demo'} className="text-primary hover:underline">
                Explore
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}