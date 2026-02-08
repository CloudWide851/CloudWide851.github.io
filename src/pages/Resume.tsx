import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, MapPin, Globe, Download, ExternalLink, Code2, Terminal, Cpu, Database } from 'lucide-react';

interface GithubProfile {
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
  location: string;
  name: string;
  login: string;
  html_url: string;
}

export default function Resume() {
  const [githubData, setGithubData] = useState<GithubProfile | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/CloudWide851')
      .then(res => res.json())
      .then(data => setGithubData(data))
      .catch(err => console.error('Failed to fetch Github data', err));
  }, []);

  const experience = [
    {
      company: "Tech Company Inc.",
      role: "Senior Frontend Engineer",
      period: "2022 - Present",
      description: "Leading the frontend team in building scalable web applications using React and TypeScript."
    },
    {
      company: "Creative Agency",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      description: "Developed interactive marketing sites and internal tools for various clients."
    }
  ];

  const techStack = [
    { icon: Code2, name: "React", color: "bg-blue-100 text-blue-700" },
    { icon: Terminal, name: "TypeScript", color: "bg-blue-100 text-blue-800" },
    { icon: Database, name: "Node.js", color: "bg-green-100 text-green-700" },
    { icon: Cpu, name: "Next.js", color: "bg-gray-100 text-gray-800" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 lg:py-20 px-4">
      {/* Print Header - Only visible when printing */}
      <div className="hidden print:block mb-8 text-center border-b pb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{githubData?.name || 'CloudWide851'}</h1>
        <p className="text-gray-600 mb-4">{githubData?.bio || 'Full Stack Developer'}</p>
        <div className="flex justify-center gap-6 text-sm text-gray-500">
          <span>{githubData?.location || 'Shanghai, China'}</span>
          <span>contact@example.com</span>
          <span>github.com/CloudWide851</span>
        </div>
      </div>

      {/* Screen Header */}
      <div className="flex justify-between items-end mb-12 print:hidden">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">Resume</h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            A visual summary of my professional journey and technical expertise.
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all shadow-lg hover:shadow-xl active:scale-95"
        >
          <Download size={18} />
          <span>Download PDF</span>
        </button>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]"
      >
        {/* Profile Card - Large */}
        <motion.div variants={item} className="md:col-span-2 md:row-span-2 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <Github size={120} />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 border-2 border-white shadow-md">
                {githubData?.avatar_url ? (
                  <img src={githubData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    <Github size={32} />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{githubData?.name || 'Loading...'}</h2>
                <p className="text-gray-500 font-medium text-lg mb-4">{githubData?.bio || 'Software Engineer'}</p>
                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <MapPin size={14} /> {githubData?.location || 'China'}
                  </span>
                  <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    <Globe size={14} /> cloudwide851.github.io
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-8">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{githubData?.public_repos || '-'}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Repositories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{githubData?.followers || '-'}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Followers</div>
                </div>
              </div>
              <a
                href={githubData?.html_url || '#'}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors"
              >
                View GitHub <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Card */}
        <motion.div variants={item} className="md:col-span-2 bg-gray-900 text-white rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

          <h3 className="text-xl font-bold mb-6 relative z-10">Get in Touch</h3>
          <div className="space-y-4 relative z-10">
            <a href="mailto:contact@example.com" className="flex items-center gap-4 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
              <div className="p-2 bg-white/10 rounded-lg">
                <Mail size={20} />
              </div>
              <div>
                <div className="text-xs text-gray-400">Email</div>
                <div className="font-medium">contact@example.com</div>
              </div>
            </a>
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={item} className="md:col-span-1 md:row-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code2 size={20} className="text-primary-600" />
            Tech Stack
          </h3>
          <div className="flex flex-col gap-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className={`p-2 rounded-lg ${tech.color}`}>
                  <tech.icon size={18} />
                </div>
                <span className="font-medium text-gray-700">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div variants={item} className="md:col-span-3 bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Experience</h3>
          <div className="space-y-8">
            {experience.map((job, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-600 ring-4 ring-primary-50 group-hover:ring-primary-100 transition-all" />
                  <div className="w-0.5 flex-1 bg-gray-100 mt-2" />
                </div>
                <div className="pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{job.role}</h4>
                    <span className="text-sm text-gray-500 font-medium px-2 py-0.5 bg-gray-100 rounded-full">{job.period}</span>
                  </div>
                  <div className="text-primary-600 font-medium mb-2">{job.company}</div>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">{job.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}