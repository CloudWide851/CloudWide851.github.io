import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense, useState, useEffect } from 'react';
import Loading from '@/components/common/Loading';
import { useTranslation } from 'react-i18next';
import { WasmProvider } from '@/context/WasmContext';

function useDynamicTitle() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.title = i18n.language.startsWith('zh') ? '云潮工作室 | Cloud Wide' : 'Cloud Wide Studio';
  }, [i18n.language]);
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useDynamicTitle();

  useEffect(() => {
    // Check for redirect path from 404.html (GitHub Pages SPA hack)
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath) {
      sessionStorage.removeItem('redirectPath');
      window.history.replaceState(null, '', redirectPath);
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <WasmProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </WasmProvider>
  );
}

export default App;
