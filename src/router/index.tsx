import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogArchive from '@/pages/BlogArchive';
import BlogPost from '@/pages/BlogPost';
import Projects from '@/pages/Projects';
import Lab from '@/pages/Lab';
import AgentPage from '@/pages/lab/AgentPage';
import SnakePage from '@/pages/lab/SnakePage';
import FaceRecognitionPage from '@/pages/lab/FaceRecognitionPage';
import CodePracticePage from '@/pages/lab/CodePracticePage';
import Resume from '@/pages/Resume';
import Creative from '@/pages/Creative';
import StorageManager from '@/pages/StorageManager';
import NotFound from '@/pages/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'blog/all',
        element: <BlogArchive />,
      },
      {
        path: 'blog/:slug',
        element: <BlogPost />,
      },
      {
        path: 'projects',
        element: <Projects />,
      },
      {
        path: 'lab',
        element: <Lab />,
      },
      {
        path: 'lab/agent',
        element: <AgentPage />,
      },
      {
        path: 'lab/snake',
        element: <SnakePage />,
      },
      {
        path: 'lab/face-3d',
        element: <FaceRecognitionPage />,
      },
      {
        path: 'lab/code-practice',
        element: <CodePracticePage />,
      },
      {
        path: 'resume',
        element: <Resume />,
      },
      {
        path: 'creative',
        element: <Creative />,
      },
      {
        path: 'storage',
        element: <StorageManager />,
      },
    ],
  },
]);

export default router;
