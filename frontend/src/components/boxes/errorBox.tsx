import { FlexColumnContainer } from '../input/labelinput'

export default function ErrorBox({
  message,
  code,
}: {
  message: string
  code: string
}) {
  return (
    <FlexColumnContainer role="alert" aria-live="assertive" aria-label="error">
      <span style={{ fontWeight: 'bold' }}>{code}</span>
      <span>{message}</span>
    </FlexColumnContainer>
  )
}
