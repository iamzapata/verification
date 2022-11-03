interface ErrorProps {
  error?: unknown
}
export function Error({ error }: ErrorProps) {
  console.error(error)
  return <div>Oh no, something went wrong!</div>
}
