import { Button } from '@/components/ui/button'
import { Link } from 'react-router'
import { VideoIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { APP_ROUTES } from '@/constant/routes'

export const HomePage = () => {
  const apiExamples = [
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
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="flex items-center justify-center">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center justify-center">
              <img
                src="/images/logo.png"
                alt="logo"
                className="size-64 object-cover"
              />
            </div>
            <h1 className="text-center text-4xl font-bold tracking-tight sm:text-6xl">
              Experimental Web APIs
              <span className="text-primary"> Playground</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore the capabilities of modern browsers through interactive
              examples of experimental Web APIs.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link to="/about">Learn More</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  to="https://github.com/e-ghazaryan-1996/web-experimental-API-s"
                  target="_blank"
                >
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute inset-x-0 top-[calc(20%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(20%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
        </div>
      </section>

      {/* API Examples Grid */}
      <section className="px-4 py-12 md:px-6">
        <div className="container">
          {apiExamples.map((category, index) => (
            <div key={index} className="mb-12">
              <h2 className="mb-6 text-2xl font-bold">{category.category}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.items.map((item, itemIndex) => (
                  <Card
                    key={itemIndex}
                    className="transition-all hover:shadow-lg"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                          {item.icon}
                        </div>
                      </div>
                      <CardTitle className="mt-4">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="secondary" className="w-full">
                        <Link to={item.path}>Try it out</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
