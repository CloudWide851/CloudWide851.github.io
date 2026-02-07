import { Link } from 'react-router-dom';
import { ArrowRight, Github, Mail, Terminal, Coffee, Layers, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import { getProjectImage } from '@/utils/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-20 pb-20">
        {/* Hero Section */}
        <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden">
          {/* Abstract Background */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-50 via-white to-white opacity-70"></div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container-custom max-w-4xl"
          >
            <motion.div variants={itemVariants} className="mb-6 inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium border border-primary-100">
              <span className="w-2 h-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              Open to new opportunities
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              Crafting Digital <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">Experiences</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12 leading-relaxed">
              I'm <span className="font-semibold text-gray-900">CloudWide851</span>. A developer passionate about building performant web applications and experimenting with new technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects" className="btn-primary group flex items-center justify-center gap-2 text-lg px-8 py-3 shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all">
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="https://github.com/CloudWide851" target="_blank" rel="noopener noreferrer" className="px-8 py-3 rounded-lg bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                <Github size={20} /> GitHub
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Bento Grid Section */}
        <section className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]"
          >
            {/* About Card - Large */}
            <div className="md:col-span-2 row-span-1 bg-gray-900 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Terminal size={120} className="text-white" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-primary-400 font-semibold mb-2 flex items-center gap-2">
                    <Code2 size={18} /> About Me
                  </h3>
                  <h2 className="text-3xl font-bold text-white mb-4">Code is my craft.</h2>
                  <p className="text-gray-400 max-w-lg">
                    I specialize in the React ecosystem, TypeScript, and modern frontend tools.
                    I love turning complex problems into simple, beautiful interfaces.
                  </p>
                </div>
                <Link to="/about" className="text-white font-medium hover:text-primary-400 transition-colors inline-flex items-center gap-1 mt-4">
                  Read more <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Tech Stack - Small */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 text-blue-600">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js'].map(tech => (
                    <span key={tech} className="text-xs font-medium bg-white px-2 py-1 rounded-md text-gray-600 border border-gray-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Blog - Small */}
            <div className="bg-white rounded-3xl p-8 border border-gray-200 flex flex-col justify-between hover:border-primary-200 transition-colors group">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                <Coffee size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">My Blog</h3>
                <p className="text-gray-500 text-sm mb-4">Thoughts on tech, life, and everything in between.</p>
                <Link to="/blog" className="text-gray-900 font-medium hover:text-primary-600 transition-colors">
                  Read Articles &rarr;
                </Link>
              </div>
            </div>

            {/* Projects - Large */}
            <div className="md:col-span-2 bg-white rounded-3xl p-8 border border-gray-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <h3 className="text-primary-600 font-semibold mb-2">Featured Projects</h3>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Building ideas into reality.</h2>
                  <p className="text-gray-600 mb-6">
                    Check out my latest experiments and production-ready applications.
                  </p>
                  <Link to="/projects" className="btn-primary">
                    View Portfolio
                  </Link>
                </div>
                <div className="w-full md:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={getProjectImage(0)}
                    alt="Project Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section className="container-custom py-20">
          <div className="bg-primary-900 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.5" />
              </svg>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's work together</h2>
              <p className="text-primary-200 text-lg max-w-2xl mx-auto mb-10">
                Have a project in mind or just want to say hi? I'm always open to discussing new ideas and opportunities.
              </p>
              <a href="mailto:cloudwide851@gmail.com" className="inline-flex items-center gap-2 bg-white text-primary-900 px-8 py-4 rounded-full font-bold hover:bg-primary-50 transition-colors shadow-lg shadow-black/20">
                <Mail size={20} />
                cloudwide851@gmail.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
