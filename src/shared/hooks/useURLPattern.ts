import { useState, useEffect } from 'react'

type PatternMatchResult = {
  pathname?: Record<string, string>
  hash?: Record<string, string>
  search?: Record<string, string>
  matched: boolean
}

export function useURLPattern() {
  const [matchResult, setMatchResult] = useState<PatternMatchResult | null>(
    null
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && !('URLPattern' in window)) {
      setIsSupported(false)
    }
  }, [])

  const testPattern = (url: string, patternString: string) => {
    try {
      setErrorMessage(null)

      if (!isSupported) {
        setErrorMessage('URL Pattern API is not supported in your browser')
        return
      }

      const pattern = new URLPattern(patternString)
      const result = pattern.exec(url)

      if (result) {
        setMatchResult({
          pathname: result.pathname.groups,
          hash: result.hash.groups,
          search: result.search.groups,
          matched: true,
        })
      } else {
        setMatchResult({ matched: false })
      }
    } catch (error) {
      setErrorMessage(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      )
      setMatchResult(null)
    }
  }

  return {
    matchResult,
    errorMessage,
    isSupported,
    testPattern,
  }
}
