"use client";

export default function CodeSnippets() {
  const snippets = [
    {
      id: 1,
      title: 'React Custom Hook for API Calls',
      language: 'JavaScript',
      code: `import { useState, useEffect } from 'react';

export const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(response.statusText);
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};`,
      description: 'A reusable React hook for making API calls with loading and error states.',
    },
    {
      id: 2,
      title: 'Debounce Function',
      language: 'JavaScript',
      code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};`,
      description: 'A utility function to debounce function calls, useful for search inputs and resize events.',
    },
    {
      id: 3,
      title: 'Dark Mode Toggle with CSS Variables',
      language: 'JavaScript',
      code: `// In your CSS
:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --primary-color: #0070f3;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
  --primary-color: #3291ff;
}

// In your JavaScript
const toggleDarkMode = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
};`,
      description: 'A simple implementation of dark mode toggle using CSS variables and localStorage.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">Code Snippets</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        A collection of useful code snippets and patterns I've developed or frequently use.
      </p>
      
      <div className="space-y-8">
        {snippets.map((snippet) => (
          <div key={snippet.id} className="card overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-2">{snippet.title}</h2>
              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded-md mb-4">
                {snippet.language}
              </span>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{snippet.description}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 overflow-x-auto">
              <pre className="text-sm">
                <code>{snippet.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}