import { useState } from 'react'
import { AlertCircle, CheckCircle, Globe, Search } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { useURLPattern } from '@/shared/hooks/useURLPattern'

export const URLPatternDemo = () => {
  const [inputUrl, setInputUrl] = useState(
    'https://example.com/products/123?category=electronics#reviews'
  )
  const [patternString, setPatternString] = useState(
    'https://example.com/products/:id\\?category=:category#:section'
  )

  const { matchResult, errorMessage, isSupported, testPattern } =
    useURLPattern()

  const handleMatch = () => {
    testPattern(inputUrl, patternString)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <div className="mb-6 flex items-center gap-2">
        <Globe className="h-6 w-6" />
        <h1 className="text-2xl font-bold">URL Pattern API Demo</h1>
      </div>

      {!isSupported && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Browser Not Supported</AlertTitle>
          <AlertDescription>
            Your browser doesnt support the experimental URL Pattern API. Try
            Chrome or Edge with the appropriate flags enabled.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="mb-1 block text-sm font-medium">
            URL to Test
          </label>
          <div className="relative">
            <input
              id="url"
              type="text"
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              className="w-full rounded-md border p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <Globe className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="pattern" className="mb-1 block text-sm font-medium">
            URL Pattern
          </label>
          <div className="relative">
            <input
              id="pattern"
              type="text"
              value={patternString}
              onChange={e => setPatternString(e.target.value)}
              className="w-full rounded-md border p-2 pr-10 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Use :paramName to define path, search, and hash parameters
          </p>
        </div>

        <Button onClick={handleMatch} disabled={!isSupported} className="w-fit">
          Test Pattern
        </Button>
      </div>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {matchResult && (
        <div className="mt-6 rounded-md border bg-gray-50 p-4">
          <div className="mb-3 flex items-center gap-2">
            {matchResult.matched ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <h2 className="text-lg font-semibold">
              {matchResult.matched
                ? 'URL matched pattern! 🎉'
                : 'URL did not match pattern ❌'}
            </h2>
          </div>

          {matchResult.matched && (
            <div className="space-y-4">
              {matchResult.pathname &&
                Object.keys(matchResult.pathname).length > 0 && (
                  <div>
                    <h3 className="text-md font-medium">Path Parameters:</h3>
                    <pre className="mt-1 overflow-x-auto rounded-md bg-gray-100 p-2">
                      {JSON.stringify(matchResult.pathname)}
                    </pre>
                  </div>
                )}

              {matchResult.search &&
                Object.keys(matchResult.search).length > 0 && (
                  <div>
                    <h3 className="text-md font-medium">Query Parameters:</h3>
                    <pre className="mt-1 overflow-x-auto rounded-md bg-gray-100 p-2">
                      {JSON.stringify(matchResult.search)}
                    </pre>
                  </div>
                )}

              {matchResult.hash && Object.keys(matchResult.hash).length > 0 && (
                <div>
                  <h3 className="text-md font-medium">Hash Parameters:</h3>
                  <pre className="mt-1 overflow-x-auto rounded-md bg-gray-100 p-2">
                    {JSON.stringify(matchResult.hash)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="mt-8 rounded-md border bg-blue-50 p-4">
        <h3 className="text-md mb-2 font-medium">Example Patterns:</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <code className="rounded bg-blue-100 px-1 py-0.5">
              https://example.com/products/:id
            </code>
            <span className="ml-2 text-gray-600">
              - Matches product pages with an ID
            </span>
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 py-0.5">
              https://example.com/blog/:year/:month/:slug
            </code>
            <span className="ml-2 text-gray-600">
              - Matches blog posts with year, month, and slug
            </span>
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 py-0.5">
              https://*.example.com/users/:userId
            </code>
            <span className="ml-2 text-gray-600">
              - Matches user profiles on any subdomain
            </span>
          </li>
          <li>
            <code className="rounded bg-blue-100 px-1 py-0.5">
              *://example.com/*\\?q=:query
            </code>
            <span className="ml-2 text-gray-600">
              - Matches search queries on any protocol
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
