import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('notfound');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4 mb-6">{t('title')}</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          {t('description')}
        </p>
        <Link to="/" className="btn-primary inline-block">
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
