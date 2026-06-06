import type { RouteRecord } from 'vite-react-ssg';
import Layout from './components/Layout';

function localeChildren(): RouteRecord[] {
  return [
    { index: true, lazy: () => import('./pages/Home') },
    { path: 'post/:slug', lazy: () => import('./pages/BlogDetail') },
    { path: 'categories', lazy: () => import('./pages/Categories') },
    { path: 'books', lazy: () => import('./pages/Books') },
    { path: 'about', lazy: () => import('./pages/About') },
  ];
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: localeChildren(),
  },
  {
    path: '/en',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: localeChildren(),
  },
  {
    path: '*',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [{ index: true, lazy: () => import('./pages/Home') }],
  },
];

export default routes;
