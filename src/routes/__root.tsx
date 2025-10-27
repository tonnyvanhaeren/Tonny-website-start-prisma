// src/routes/__root.tsx
/// <reference types="vite/client" />
import type { ReactNode } from 'react';
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';
// import { AuthProvider, useAuth } from '~/contexts/auth';
import { fetchSessionData } from '~/server/functions/user-server-fn';
import NotFound from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { Navbar } from '~/components/Navbar';
import { Toaster } from 'react-hot-toast';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  beforeLoad: async () => {
    const user = await fetchSessionData();

    return {
      user,
    };
  },
  component: RootComponent,
  notFoundComponent: () => {
    return <NotFound />;
  },
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { user } = Route.useRouteContext();
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className='bg-superhero-dark font-poppins'>
        <header>
          <Navbar />
        </header>
        <main className='text-white p-1'>
          {user?.email}
          {children}
          <Toaster
            position='bottom-center'
            toastOptions={{
              className: '',
              style: {
                fontSize: '12px',
                border: '2px solid #713200',
                padding: '16px',
                color: '#713200',
              },
            }}
          />
        </main>

        <Scripts />
      </body>
    </html>
  );
}
