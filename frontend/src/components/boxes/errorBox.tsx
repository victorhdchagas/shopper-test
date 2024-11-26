export default function ErrorBox({
  message,
  code,
}: {
  message: string
  code: string
}) {
  return (
    <div role="alert" aria-live="assertive" aria-label="error">
      <span>{code}</span>
      <span>{message}</span>
    </div>
  )
}
