"use client";



export default function Contact() {



  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">Get In Touch</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        Have a question or want to connect? Feel free to reach out through any of the channels below.
      </p>
      
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">Email</h3>
            <p className="text-primary">arajan60@gmail.com</p>
          </div>
          <div>
            <h3 className="font-medium">LinkedIn</h3>
            <a href="https://www.linkedin.com/in/abhilashrajangm/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              linkedin.com/in/abhilashrajangm
            </a>
          </div>
          <div>
            <h3 className="font-medium">Twitter</h3>
            <a href="https://twitter.com/ai_stats" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              @ai_stats
            </a>
          </div>
        </div>
      </div>
      
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Let's Connect</h2>
        <p className="mb-4">
          I'm always open to discussing new projects, opportunities, or partnerships. Whether you have a question 
          about customer service technology, AI implementation, or just want to say hi, I'll do my best to get 
          back to you as soon as possible!
        </p>
      </div>
    </div>
  );
}