import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { HomeIcon, ArrowLeft, AlertCircle } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Error Container */}
        <div className="space-y-6 text-center">
          {/* Icon */}
          <div className="relative mx-auto h-24 w-24">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/10" />
            <div className="relative flex h-24 w-24 items-center justify-center">
              <AlertCircle className="h-12 w-12 text-primary" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              404
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight">
              Page not found
            </h2>
            <p className="text-muted-foreground">
              Oops! The page you`&apos;`re looking for doesn&apos;t exist or has
              been moved.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild>
              <Link to="/" className="gap-2">
                <HomeIcon className="h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
          </div>

          {/* Additional Help */}
          <div className="border-t pt-8 text-sm text-muted-foreground">
            <p>Looking for something specific?</p>
            <p>
              Try checking the{' '}
              <Link
                to="/examples"
                className="text-primary underline-offset-4 hover:underline"
              >
                examples page
              </Link>{' '}
              or{' '}
              <Link
                to="/docs"
                className="text-primary underline-offset-4 hover:underline"
              >
                documentation
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
