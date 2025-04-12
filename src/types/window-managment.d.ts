// Extended Screen interface with additional properties
interface Screen extends EventTarget {
  // Standard Screen properties
  availWidth: number
  availHeight: number
  width: number
  height: number
  colorDepth: number
  pixelDepth: number

  // Properties standardized in the Window Management API spec
  availLeft: number
  availTop: number
  left: number
  top: number

  // New property from the spec
  isExtended: boolean

  // Event handler for screen changes
  onchange: ((this: Screen, ev: Event) => unknown) | null

  // Additional properties from ScreenDetailed
  isPrimary: boolean
  isInternal: boolean
  devicePixelRatio: number
  label?: string
  id: string
}

// ScreenDetailed interface as defined in the spec
interface ScreenDetailed extends Screen {
  // Properties inherited from Screen, plus:
  isPrimary: boolean
  isInternal: boolean
  devicePixelRatio: number
  label: string
  id: string
}

// ScreenDetails interface as defined in the spec
interface ScreenDetails extends EventTarget {
  // The set of available screens with additional per-screen info
  readonly screens: ReadonlyArray<ScreenDetailed>

  // A reference to the current screen with additional info
  readonly currentScreen: ScreenDetailed

  // Event handlers
  onscreenschange: ((this: ScreenDetails, ev: Event) => unknown) | null
  oncurrentscreenchange: ((this: ScreenDetails, ev: Event) => unknown) | null

  // Event listeners
  addEventListener(
    type: 'screenschange',
    listener: (ev: Event) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void
  addEventListener(
    type: 'currentscreenchange',
    listener: (ev: Event) => unknown,
    options?: boolean | AddEventListenerOptions
  ): void
  removeEventListener(
    type: 'screenschange',
    listener: (ev: Event) => unknown,
    options?: boolean | EventListenerOptions
  ): void
  removeEventListener(
    type: 'currentscreenchange',
    listener: (ev: Event) => unknown,
    options?: boolean | EventListenerOptions
  ): void
}

// WindowInfo interface as defined in the spec
interface WindowInfo {
  id: string
  title: string
  mode: 'normal' | 'minimized' | 'maximized' | 'fullscreen'
  width: number
  height: number
  left: number
  top: number

  // Methods for window manipulation
  close(): Promise<void>
  focus(): Promise<void>
}

// WindowManagement interface as defined in the spec
interface WindowManagement {
  getAll(): Promise<WindowInfo[]>
}

// Extended FullscreenOptions to support screen-specific fullscreen
interface FullscreenOptions {
  navigationUI?: 'auto' | 'show' | 'hide'
  screen?: ScreenDetailed
}

// Extend the Window interface to add new methods and properties
interface Window {
  // Existing window methods extended for multi-screen support
  moveTo(x: number, y: number): void
  moveBy(x: number, y: number): void
  resizeTo(width: number, height: number): void
  resizeBy(width: number, height: number): void

  // New method for accessing screen details
  getScreenDetails(): Promise<ScreenDetails>

  // New method for accessing window management
  getWindowManagement(): Promise<WindowManagement>

  // Current screen info
  readonly screen: Screen

  // Size and position information
  readonly screenX: number
  readonly screenLeft: number
  readonly screenY: number
  readonly screenTop: number
  readonly outerWidth: number
  readonly outerHeight: number
}

// Extend the Navigator interface to include permission status
interface Navigator {
  permissions: {
    query(permissionDesc: { name: PermissionName }): Promise<PermissionStatus>
  }
}

// Permission name type
type PermissionName =
  | 'window-management'
  | 'geolocation'
  | 'notifications'
  | 'camera'
  | 'microphone'

// Permission status interface
interface PermissionStatus extends EventTarget {
  state: PermissionState
  onchange: ((this: PermissionStatus, ev: Event) => unknown) | null
}

// Permission state type
type PermissionState = 'granted' | 'denied' | 'prompt'

// Extend Element interface for fullscreen capabilities
interface Element {
  requestFullscreen(options?: FullscreenOptions): Promise<void>
}

// Extend Document interface for fullscreen capabilities
interface Document {
  readonly fullscreenElement: Element | null
  exitFullscreen(): Promise<void>
}

// Error type for Window Management API errors
interface WindowManagementError extends Error {
  name: string
  message: string
}
