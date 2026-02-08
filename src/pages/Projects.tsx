import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, ArrowUpRight } from 'lucide-react';

export default function Projects() {
  const { t } = useTranslation('projects');

  const projects = [
    {
      title: "Personal Website",
      description: "The modern, responsive website you are looking at right now. Built with React, Vite, and Tailwind CSS. Features include 3D experiments, internationalization, and a custom design system.",
      tech: ["React", "TypeScript", "Tailwind CSS", "Three.js", "Framer Motion"],
      github: "https://github.com/CloudWide851/CloudWide851.github.io",
      link: "https://cloudwide851.github.io",
      featured: true,
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop"
    },
    // Add more projects here as needed
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 lg:py-20 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 border-b border-gray-100 pb-12"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl font-light leading-relaxed">
          {t('subtitle')}
        </p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`group relative bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 ${project.featured ? 'md:col-span-2' : ''}`}
          >
            <div className={`grid ${project.featured ? 'md:grid-cols-2' : 'grid-cols-1'} h-full`}>
              <div className="relative overflow-hidden bg-gray-100 min-h-[240px]">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                )}
              </div>

              <div className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all"
                      >
                        <ArrowUpRight size={20} />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}