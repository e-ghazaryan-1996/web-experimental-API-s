import { VideoIcon, ContactIcon, Globe } from 'lucide-react'
import { APP_ROUTES } from '@/constant/routes'

export const apiExamples = [
  {
    category: 'Media',
    items: [
      {
        title: 'Document Picture-in-Picture API',
        description:
          'The Picture-in-Picture (PiP) API enables developers to display videos in a floating, resizable window that stays on top of other windows.',
        path: APP_ROUTES.PIP,
        icon: <VideoIcon className="h-6 w-6" />,
        experimental: true,
      },
    ],
  },
  {
    category: 'Mobile',
    items: [
      {
        title: 'Contact Picker API',
        description:
          'The Contact Picker API allows web applications to request access to a users contacts',
        path: APP_ROUTES.CONTACT_PICKER,
        icon: <ContactIcon className="h-6 w-6" />,
        experimental: true,
      },
    ],
  },
  {
    category: 'Navigation',
    items: [
      {
        title: 'URL pattern API',
        description:
          'The URL Pattern API defines a syntax that is used to create URL pattern matchers.',
        path: APP_ROUTES.URL_PATTERN,
        icon: <Globe className="h-6 w-6" />,
        experimental: true,
      },
    ],
  },
]
