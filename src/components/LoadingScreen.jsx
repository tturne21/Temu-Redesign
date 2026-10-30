
import '../styles/loading-screen.css'
import { useEffect, useRef } from 'react'

function LoadingScreen({
  heading = '',
  message = 'LOADING...',
  description = 'Please wait a moment',
  onComplete,
  duration = 1200

}) {

    const completeRef = useRef(onComplete)

useEffect(() => {
  completeRef.current = onComplete
}, [onComplete])

useEffect(() => {
  if (!completeRef.current) return

  const timer = setTimeout(() => {
    completeRef.current?.()
  }, duration)

  return () => clearTimeout(timer)
}, [duration])
  return (
    <main className="loading-screen" role="status">
      {heading && (
        <h1 className="loading-screen__heading">
          {heading}
        </h1>
      )}

      <div className="loading-screen__content">
        <img
          src="src/assets/images/loading-icon.png"
          alt=""
          className="loading-screen__icon"
        />

        <p className="loading-screen__message">
          {message}
        </p>

        <p className="loading-screen__description">
          {description}
        </p>
      </div>
    </main>
  )
}

export default LoadingScreen
