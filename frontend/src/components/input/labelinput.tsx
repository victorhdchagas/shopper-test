import styled from 'styled-components'

export const FlexColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`

const Label = styled.label`
  font-size: 14px;
  color: #333; /* Cor do texto do label */
  margin-bottom: 4px; /* Espaçamento entre o label e o input */
`

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc; /* Borda do input */
  border-radius: 4px; /* Bordas arredondadas */
  outline: none; /* Remove o contorno padrão */
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff; /* Cor da borda ao focar */
  }

  &::placeholder {
    color: #aaa; /* Cor do placeholder */
  }
`
export default function LabelInput({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}: {
  label: string
  name: string
  type: string
  placeholder: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <FlexColumnContainer>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </FlexColumnContainer>
  )
}
