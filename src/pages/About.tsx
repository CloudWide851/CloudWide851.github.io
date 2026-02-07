import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  return (
    <div className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      <div className="prose prose-lg text-gray-600">
        <p>
          {t('intro')}
        </p>
        <p>
          {t('description')}
        </p>
        <h2>{t('journey.title')}</h2>
        <p>
          {t('journey.content')}
        </p>
        <h2>{t('skills.title')}</h2>
        <ul>
          {(t('skills.items', { returnObjects: true }) as string[]).map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
