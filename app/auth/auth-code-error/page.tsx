export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Authentication Error</h1>
        <p className="text-gray-600 mb-6">There was an error with your authentication. Please try signing in again.</p>
        <a href="/auth/login" className="btn-primary inline-block">
          Back to Login
        </a>
      </div>
    </div>
  )
}
