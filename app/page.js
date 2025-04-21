import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <div className="max-w-3xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <Image 
            src="/images/profile/profile-image.png" 
            alt="Abhilash's profile picture" 
            width={200} 
            height={200} 
            className="rounded-full shadow-lg mx-auto"
          />
        </div>
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Hello, I'm <span className="text-primary">Abhilash</span>
        </h1>
        <h2 className="font-heading text-2xl md:text-3xl mb-8 text-gray-700 dark:text-gray-300">
          General Manager & AI Enthusiast
        </h2>
        <p className="font-sans text-lg mb-8 text-gray-600 dark:text-gray-400">
          I help businesses connect with customers through innovative chat technology.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/about" className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            Learn More About Me
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  );
}