// src/routes/__root.tsx
/// <reference types="vite/client" />
import { type ReactNode } from 'react';
import {
  createRootRouteWithContext,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router';

import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { TanStackRouterDevtoolsPanel } from '@TanStack/react-router-devtools';
import { Toaster } from 'react-hot-toast';

import NotFound from '~/components/NotFound';
import appCss from '~/styles/app.css?url';
import { Navbar } from '~/components/Navbar';

import { getCurrentUserSFN } from '../server/functions/user-server-fn';
import { AuthState } from '../hooks/useAuth';

interface MyRouterContext {
  auth: AuthState;
  user: Awaited<ReturnType<typeof getCurrentUserSFN>>; // Updated function name
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  beforeLoad: async () => {
    const user = await getCurrentUserSFN();
    // console.log('Root Route beforeload - user : ', user);
    return { user };
  },
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
  pendingComponent: () => <div>Loading Application...</div>,
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
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              // {
              //   name: 'TanStack Query',
              //   render: <ReactQueryDevtoolsPanel />,
              //   defaultOpen: true,
              // },
              {
                name: 'TanStack Router',
                render: <TanStackRouterDevtoolsPanel />,
                defaultOpen: false,
              },
            ]}
          />
        </main>

        <Scripts />
      </body>
    </html>
  );
}
