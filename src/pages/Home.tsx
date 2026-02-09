import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Coffee, Layers, Code2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import PageTransition from '@/components/common/PageTransition';
import InteractiveHero from '@/components/home/InteractiveHero';
import { getProjectImage } from '@/utils/image';
import { cn } from '@/lib/utils';

// Helper for 3D tilt effect
function TiltCard({ children, className }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["2deg", "-2deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-2deg", "2deg"]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={cn("relative transition-all duration-200 ease-out", className)}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <PageTransition>
      <div className="space-y-12 pb-24">
        {/* Interactive Hero */}
        <InteractiveHero />

        {/* Bento Grid Section */}
        <section className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]"
          >
            {/* About Card - Large */}
            <TiltCard className="md:col-span-2 row-span-1">
              <div className="h-full bg-gray-900 rounded-2xl p-8 relative overflow-hidden group hover:shadow-xl transition-shadow border border-gray-800">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Terminal size={140} className="text-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-primary-400 font-medium mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                      <Code2 size={16} /> About
                    </h3>
                    <h2 className="text-3xl font-bold text-white mb-4 font-display">Code is my craft.</h2>
                    <p className="text-gray-400 max-w-md leading-relaxed">
                      Specializing in React, TypeScript, and modern frontend architecture.
                      I transform complex requirements into elegant, high-performance interfaces.
                    </p>
                  </div>
                  <Link to="/about" className="text-white font-medium hover:text-primary-400 transition-colors inline-flex items-center gap-2 group/link">
                    Read more <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Tech Stack - Small */}
            <TiltCard>
              <div className="h-full bg-white rounded-2xl p-8 border border-gray-100 flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  <Layers size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-display">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'Next.js'].map(tech => (
                      <span key={tech} className="text-xs font-medium bg-gray-50 px-2.5 py-1 rounded-md text-gray-600 border border-gray-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Blog - Small */}
            <TiltCard>
              <div className="h-full bg-white rounded-2xl p-8 border border-gray-100 flex flex-col justify-between hover:border-primary-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 text-orange-600 group-hover:bg-orange-100 transition-colors">
                  <Coffee size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Thoughts</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">Insights on web development, design patterns, and digital minimalism.</p>
                  <Link to="/blog" className="text-gray-900 font-medium hover:text-orange-600 transition-colors inline-flex items-center gap-1">
                    Read Articles <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </TiltCard>

            {/* Projects - Large */}
            <TiltCard className="md:col-span-2">
              <div className="h-full bg-white rounded-2xl p-8 border border-gray-100 relative overflow-hidden group hover:shadow-xl hover:border-gray-200 transition-all flex items-center">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex-1">
                  <h3 className="text-primary-600 font-medium mb-4 text-sm uppercase tracking-wider">Featured Work</h3>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 font-display">Building ideas into reality.</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed max-w-lg">
                    A curated collection of my latest experiments, production applications, and open source contributions.
                  </p>
                  <Link to="/projects" className="btn-primary py-2.5 px-6 inline-flex items-center gap-2 text-sm">
                    View Portfolio <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
}
