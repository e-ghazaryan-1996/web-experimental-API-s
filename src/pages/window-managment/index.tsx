import { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  MonitorSmartphone,
  Maximize2,
  Maximize,
  ArrowUpRight,
  AlertCircle,
} from 'lucide-react'
import { useWindowManagement } from '@/shared/hooks/useWindowManagment'

const usageInstructions = [
  'Click "Get Screens" to request permission and screen information',
  'Once screens are detected, you can view their properties',
  'Open new windows on specific screens with "Open Window Here"',
  'Move the current window to another screen with "Move to This Screen"',
  'Test fullscreen functionality on different screens with "Fullscreen Here"',
  'Note: This API requires Chrome 100+ with appropriate permissions',
]

const WindowManagementDemo = () => {
  const fullscreenRef = useRef<HTMLDivElement>(null)
  const {
    screens,
    currentScreen,
    error,
    isApiSupported,
    permissionStatus,
    getScreens,
    openWindowOnScreen,
    moveWindowToScreen,
    requestFullscreenOnScreen,
    toggleFullscreen,
    clearError,
  } = useWindowManagement()

  useEffect(() => {
    if (isApiSupported && permissionStatus === 'granted') {
      getScreens()
    }
  }, [isApiSupported, permissionStatus])

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Window Management API Demo</CardTitle>
          <CardDescription>
            Control and manage windows across multiple screens
          </CardDescription>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={clearError}
          >
            Dismiss
          </Button>
        </Alert>
      )}

      {!isApiSupported && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Not Supported</AlertTitle>
          <AlertDescription>
            Window Management API is not supported in this browser. Try using
            Chrome 100+ with the appropriate experimental flags enabled.
          </AlertDescription>
        </Alert>
      )}

      {isApiSupported && permissionStatus === 'prompt' && (
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Permission Required</AlertTitle>
          <AlertDescription>
            Click &quot;Get Screens&quot; to request permission to access
            multi-screen information.
          </AlertDescription>
        </Alert>
      )}

      {isApiSupported && permissionStatus === 'denied' && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Permission Denied</AlertTitle>
          <AlertDescription>
            You&apos;ve denied permission to access multi-screen information.
            Please reset permissions for this site to use multi-screen features.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="screens" className="mb-6">
        <TabsList className="w-full">
          <TabsTrigger value="screens" className="flex-1">
            <MonitorSmartphone className="mr-2 h-4 w-4" /> Screens
          </TabsTrigger>
          <TabsTrigger value="fullscreen" className="flex-1">
            <Maximize className="mr-2 h-4 w-4" /> Fullscreen
          </TabsTrigger>
        </TabsList>

        <TabsContent value="screens">
          <Card>
            <CardHeader>
              <CardTitle>Screen Management</CardTitle>
              <CardDescription>
                View and control available screens
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentScreen && (
                <div className="mb-6">
                  <h3 className="mb-2 text-sm font-medium">Current Screen</h3>
                  <Card>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {currentScreen.label || 'Current Screen'}
                        </CardTitle>
                        <Badge variant="outline" className="bg-blue-50">
                          Current
                        </Badge>
                      </div>
                      <CardDescription>
                        Resolution: {currentScreen.width}×{currentScreen.height}
                        {currentScreen.isPrimary && ' (Primary)'}
                        {currentScreen.isInternal && ' (Internal)'}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              )}

              <div>
                <h3 className="mb-2 text-sm font-medium">
                  Available Screens ({screens.length})
                </h3>

                {screens.length > 0 ? (
                  <div className="space-y-4">
                    {screens.map((screen, index) => (
                      <Card key={index}>
                        <CardHeader className="py-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              {screen.label || `Screen ${index + 1}`}
                            </CardTitle>
                            <div className="flex gap-1">
                              {screen.isPrimary && (
                                <Badge
                                  variant="outline"
                                  className="bg-green-50"
                                >
                                  Primary
                                </Badge>
                              )}
                              {screen.isInternal && (
                                <Badge
                                  variant="outline"
                                  className="bg-yellow-50"
                                >
                                  Internal
                                </Badge>
                              )}
                            </div>
                          </div>
                          <CardDescription>
                            Resolution: {screen.width}×{screen.height}, DPR:{' '}
                            {screen.devicePixelRatio.toFixed(2)}, Available:{' '}
                            {screen.availWidth}×{screen.availHeight}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="pb-3 pt-0">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openWindowOnScreen(screen)}
                            >
                              <ArrowUpRight className="mr-1 h-4 w-4" />
                              Open Window Here
                            </Button>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => moveWindowToScreen(screen)}
                            >
                              <Maximize2 className="mr-1 h-4 w-4" />
                              Move to This Screen
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              onClick={() =>
                                requestFullscreenOnScreen(
                                  fullscreenRef.current,
                                  screen
                                )
                              }
                            >
                              <Maximize className="mr-1 h-4 w-4" />
                              Fullscreen Here
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    No screens detected. Click the &quot;Get Screens&quot;
                    button to request screen information.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fullscreen">
          <Card>
            <CardHeader>
              <CardTitle>Fullscreen Demo</CardTitle>
              <CardDescription>
                Test fullscreen functionality across screens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={fullscreenRef}
                className="mb-4 rounded border bg-gray-50 p-6 text-center"
                style={{ minHeight: '200px' }}
              >
                <h3 className="mb-2 text-lg font-medium">Fullscreen Content</h3>
                <p>
                  This content can be displayed in fullscreen mode on any
                  screen.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Press ESC to exit fullscreen mode once activated.
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() =>
                    toggleFullscreen(fullscreenRef.current || undefined)
                  }
                  variant="default"
                >
                  <Maximize className="mr-1 h-4 w-4" />
                  Toggle Fullscreen
                </Button>
                {screens.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      requestFullscreenOnScreen(fullscreenRef.current)
                    }
                  >
                    Default Fullscreen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Usage Instructions</CardTitle>
          <CardDescription>
            How to use the Window Management API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-5">
            {usageInstructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

export default WindowManagementDemo
