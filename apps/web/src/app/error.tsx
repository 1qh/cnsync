'use client'
const ErrorPage = ({ error }: { error: Error }) => (
  <pre className='p-8 whitespace-pre-wrap'>
    {error.message}
    {error.stack}
  </pre>
)
export default ErrorPage
