import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, Mail, MapPin } from 'lucide-react';

export default function About() {
  const { t } = useTranslation('about');

  const stats = [
    { label: "Years Exp", value: "3+" },
    { label: "Projects", value: "15+" },
    { label: "Contributions", value: "500+" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 lg:py-20 px-4">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-[1.1]">
            {t('title')}
          </h1>
          <div className="prose prose-lg text-gray-500 leading-relaxed">
            <p className="text-xl font-light text-gray-900 mb-6">
              {t('intro')}
            </p>
            <p>
              {t('description')}
            </p>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-black transition-all shadow-lg shadow-gray-200">
              <Mail size={18} />
              Contact Me
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all">
              <Download size={18} />
              Resume
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-gray-100 relative z-10">
             {/* Placeholder for profile image */}
             <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-100 flex items-center justify-center">
                <span className="text-gray-400 font-mono">Profile Image</span>
             </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-48 p-6 bg-white rounded-2xl shadow-xl border border-gray-100 z-20">
             <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
               <MapPin size={16} className="text-primary-600" />
               <span>Based in</span>
             </div>
             <p className="font-bold text-gray-900">Shanghai, China</p>
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-3 gap-8 border-y border-gray-100 py-12 mb-24"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-sm text-gray-500 uppercase tracking-widest font-mono">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Content Section */}
      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 sticky top-24">Background</h2>
        </div>
        <div className="md:col-span-8 prose prose-lg text-gray-500">
          <h3 className="text-gray-900">{t('journey.title')}</h3>
          <p>{t('journey.content')}</p>
        </div>
      </div>

      <div className="my-12 h-px bg-gray-100" />

      <div className="grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 sticky top-24">Technical Skills</h2>
        </div>
        <div className="md:col-span-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {(t('skills.items', { returnObjects: true }) as string[]).map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <span className="font-medium text-gray-700">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}