import React from 'react'
import { Button } from './button'

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean
}

const withSubmitButton = (props: SubmitButtonProps) => (
  <Button {...props} type="submit" disabled={props.disabled || props.isPending}>
    {props.isPending ? 'Carregando' : props.children}
  </Button>
)
export const SubmitButton = (props: SubmitButtonProps) => {
  return withSubmitButton(props)
}
