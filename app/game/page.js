"use client";

import { useEffect } from 'react';

export default function GamePage() {
  useEffect(() => {
    // Redirect to the game in the public folder
    window.location.href = '/game/index.html';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Loading Neon Glide...</p>
    </div>
  );
}