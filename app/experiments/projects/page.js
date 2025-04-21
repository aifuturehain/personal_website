"use client";

export default function MiniProjects() {
  const projects = [
    {
      id: 1,
      title: 'To-Do List App',
      description: 'A simple and intuitive to-do list application to help you organize tasks, set priorities, and boost your productivity.',
      technologies: [],
      demoLink: 'https://2qm5g8vk9a.app.yourware.so/',
      codeLink: '',
    },
    {
      id: 2,
      title: 'Project Management App',
      description: 'A comprehensive project management tool to help teams track tasks, manage deadlines, and collaborate effectively on projects of any size.',
      technologies: [],
      demoLink: 'https://ixojr7othn.app.yourware.so/',
      codeLink: '',
    },
    {
      id: 3,
      title: 'Focus Room',
      description: 'An interactive weather application that helps you stay prepared with real-time weather updates and forecasts. Features a clean interface for checking conditions anywhere in the world.',
      technologies: [],
      demoLink: 'https://tzk3eujzjj.app.yourware.so/',
      codeLink: '',
    },
    {
      id: 4,
      title: 'Advanced Sticky Notes',
      description: 'A feature-rich digital sticky notes application that helps you organize thoughts, reminders, and ideas. Create, customize, and manage your notes with an intuitive and user-friendly interface.',
      technologies: [],
      demoLink: 'https://ppjfxdgrg2.app.yourware.so/',
      codeLink: '',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="section-title">Mini Projects</h1>
      <p className="text-lg mb-8 text-gray-600 dark:text-gray-400">
        A showcase of small projects and experiments I've built to explore different technologies and concepts.
      </p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="card p-6">
            <h2 className="text-xl font-bold mb-2">{project.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
            
            {project.id !== 1 && project.id !== 2 && project.technologies.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-700 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {(project.id === 1 || project.id === 2 || project.id === 3 || project.id === 4) ? (
              <div className="flex items-center justify-center mt-8 mb-4">
                <a 
                  href={project.demoLink} 
                  className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try it
                </a>
              </div>
            ) : (
              <div className="flex gap-4">
                <a 
                  href={project.demoLink} 
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live Demo
                </a>
                {project.codeLink && (
                  <a 
                    href={project.codeLink} 
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Code
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}