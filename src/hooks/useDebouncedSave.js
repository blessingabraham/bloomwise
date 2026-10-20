import { useEffect, useRef } from 'react'

/** Calls `save(value)` 700ms after `value` stops changing (skips the first render). */
export function useDebouncedSave(value, save, enabled = true) {
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    if (!enabled) return
    const t = setTimeout(() => save(value), 700)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
}
