import { RootLayout } from '@/layouts/Layout'
import { HomePage } from '@/pages'
import { NotFoundPage } from '@/pages/not-found'
import { PictureInPicturePlayer } from '@/pages/picture-in-picture'
import { ContactPickerPage } from '@/pages/contact-picker'
import { createBrowserRouter } from 'react-router'
import { URLPatternDemo } from '@/pages/url-patern'
import WindowManagementDemo from '@/pages/window-managment'

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
        path: '/contact-picker',
        element: <ContactPickerPage />,
      },
      {
        path: '/url-pattern',
        element: <URLPatternDemo />,
      },
      {
        path: '/window-management',
        element: <WindowManagementDemo />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
