
import '../styles/loading-screen.css'

function LoadingScreen({
  heading = '',
  message = 'LOADING...',
  description = 'Please wait a moment'
}) {
  return (
    <main className="loading-screen" role="status">
      {heading && (
        <h1 className="loading-screen__heading">
          {heading}
        </h1>
      )}

      <div className="loading-screen__content">
        <img
          src="/loading-icon.png"
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
