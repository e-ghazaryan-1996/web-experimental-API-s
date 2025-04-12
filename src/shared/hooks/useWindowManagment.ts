import { useState, useEffect } from 'react'

export const useWindowManagement = () => {
  const [screens, setScreens] = useState<ScreenDetailed[]>([])
  const [currentScreen, setCurrentScreen] = useState<ScreenDetailed | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const [isApiSupported, setIsApiSupported] = useState<boolean>(false)
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState>('prompt')

  useEffect(() => {
    if ('getScreenDetails' in window) {
      setIsApiSupported(true)
      checkPermission()
    } else {
      setError('Window Management API is not supported in this browser')
    }
  }, [])

  // Check permission status
  const checkPermission = async (): Promise<void> => {
    try {
      const status = await navigator.permissions.query({
        name: 'window-management' as PermissionName,
      })
      setPermissionStatus(status.state)

      status.addEventListener('change', () => {
        setPermissionStatus(status.state)
      })
    } catch (err: unknown) {
      console.error('Permission API not supported or other error:', err)
    }
  }

  // Get available screens
  const getScreens = async (): Promise<ScreenDetailed[]> => {
    try {
      if (!isApiSupported) return []

      const screenDetails = await window.getScreenDetails()

      setCurrentScreen(screenDetails.currentScreen)

      setScreens([...screenDetails.screens])
      console.log('Available screens:', screenDetails.screens)

      screenDetails.addEventListener('screenschange', () => {
        setScreens([...screenDetails.screens])
        console.log('Screens configuration changed:', screenDetails.screens)
      })

      screenDetails.addEventListener('currentscreenchange', () => {
        setCurrentScreen(screenDetails.currentScreen)
        console.log('Current screen changed:', screenDetails.currentScreen)
      })

      return [...screenDetails.screens]
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error accessing screen details: ${errorMessage}`)
      console.error('Error accessing screen details:', err)
      return []
    }
  }

  const openWindowOnScreen = async (screen: ScreenDetailed) => {
    try {
      if (!isApiSupported) return false

      if (!screen) {
        throw new Error('Screen not provided')
      }

      const left = screen.availLeft + screen.availWidth / 2 - 400
      const top = screen.availTop + screen.availHeight / 2 - 300

      const newWindow = window.open(
        `${window.origin}/window-management`,
        '_blank',
        `width=800,height=600,left=${left},top=${top}`
      )

      if (newWindow) {
        newWindow.addEventListener('unload', () => {
          console.log('Window was closed')
        })

        return true
      }

      return false
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error opening window: ${errorMessage}`)
      console.error('Error opening window:', err)
      return false
    }
  }

  const moveWindowToScreen = async (screen: ScreenDetailed) => {
    console.log('Moving window to screen:', screen)
    try {
      if (!isApiSupported) return false

      if (!screen) {
        throw new Error('Screen not provided')
      }

      const left =
        screen.availLeft + screen.availWidth / 2 - window.outerWidth / 2
      const top =
        screen.availTop + screen.availHeight / 2 - window.outerHeight / 2

      window.moveTo(left, top)
      return true
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error moving window: ${errorMessage}`)
      console.error('Error moving window:', err)
      return false
    }
  }

  const requestFullscreenOnScreen = async (
    element: HTMLElement | null,
    screen?: ScreenDetailed
  ): Promise<boolean> => {
    try {
      if (!isApiSupported) return false

      if (!element) {
        throw new Error('Element not provided')
      }

      if (!screen) {
        await element.requestFullscreen()
      } else {
        await element.requestFullscreen({ screen })
      }

      return true
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error requesting fullscreen: ${errorMessage}`)
      console.error('Error requesting fullscreen:', err)
      return false
    }
  }

  const toggleFullscreen = async (element?: HTMLElement) => {
    try {
      if (!element) {
        element = document.documentElement
      }

      if (document.fullscreenElement) {
        await document.exitFullscreen()
      } else {
        await element.requestFullscreen()
      }
      return true
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(`Error toggling fullscreen: ${errorMessage}`)
      console.error('Error toggling fullscreen:', err)
      return false
    }
  }

  const clearError = () => setError(null)

  return {
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
  }
}
