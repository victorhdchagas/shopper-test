import React from 'react'
import styled from 'styled-components'

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean
}
const Button = styled.button`
  background-color: red;
`
export const SubmitButton = (props: SubmitButtonProps) => {
  return (
    <Button type="submit" disabled={props.disabled || props.isPending}>
      {props.isPending ? 'Carregando' : props.children}
    </Button>
  )
}
