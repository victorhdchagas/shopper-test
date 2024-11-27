import React, { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { PortalContainer } from './styled/portal/container'
import { PortalOverlay } from './styled/portal/overlay'
interface PortalAtom {
  children: React.ReactNode
  open: boolean
  onPressEscape?: () => void
}
// eslint-disable-next-line react-refresh/only-export-components
function PortalAtom({ children, open, onPressEscape }: PortalAtom) {
  const [element, setElement] = React.useState<HTMLElement | null>(null)
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onPressEscape) {
        onPressEscape()
      }
    },
    [onPressEscape],
  )
  useEffect(() => {
    const newElement = document.createElement('div')

    document.addEventListener('keydown', escFunction, false)

    setElement(newElement)
    document.body.appendChild(newElement)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
      document.body.removeChild(newElement)
      setElement(null)
    }
  }, [escFunction])
  return open && element ? createPortal(children, element) : null
}

export default {
  Container: PortalContainer,
  Overlay: PortalOverlay,
  PortalAtom,
}
