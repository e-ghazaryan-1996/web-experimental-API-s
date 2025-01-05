import { RootLayout } from '@/layouts/Layout'
import { HomePage } from '@/pages'
import { NotFoundPage } from '@/pages/not-found'
import { PictureInPicturePlayer } from '@/pages/picture-in-picture'
import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/picture-in-picture',
        element: <PictureInPicturePlayer />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
