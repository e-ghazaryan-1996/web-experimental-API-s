interface URLPatternInit {
  protocol?: string
  username?: string
  password?: string
  hostname?: string
  port?: string
  pathname?: string
  search?: string
  hash?: string
  baseURL?: string
}

interface URLPatternComponentResult {
  input: string
  groups: Record<string, string>
}

interface URLPatternResult {
  inputs: string[]
  protocol: URLPatternComponentResult
  username: URLPatternComponentResult
  password: URLPatternComponentResult
  hostname: URLPatternComponentResult
  port: URLPatternComponentResult
  pathname: URLPatternComponentResult
  search: URLPatternComponentResult
  hash: URLPatternComponentResult
}

declare global {
  class URLPattern {
    constructor(input: string | URLPatternInit, baseURL?: string)
    test(input: string | URLPatternInit, baseURL?: string): boolean
    exec(
      input: string | URLPatternInit,
      baseURL?: string
    ): URLPatternResult | null
  }
}

export {}
