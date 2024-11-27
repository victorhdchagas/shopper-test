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
      <span style={{ fontWeight: 'bold', color: 'white' }}>{code}</span>
      <span style={{ color: 'white' }}>{message}</span>
    </FlexColumnContainer>
  )
}
