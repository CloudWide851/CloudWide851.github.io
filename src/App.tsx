import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Suspense, useState, useEffect } from 'react';
import Loading from '@/components/common/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

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
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
