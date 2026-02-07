import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation('projects');

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('subtitle')}</p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for projects - you can make this dynamic later */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold mb-2">Personal Website</h3>
          <p className="text-gray-600 mb-4">
            The website you are looking at right now. Built with React, Vite, and Tailwind CSS.
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">React</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">TypeScript</span>
          </div>
          <a
            href="https://github.com/CloudWide851/CloudWide851.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:underline text-sm font-medium"
          >
            {t('viewSource')}
          </a>
        </div>
      </div>
    </div>
  );
}
