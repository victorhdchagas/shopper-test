import React from 'react'
import styled from 'styled-components'

// Estilizando o Jumbotron
const JumbotronContainer = styled.div`
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 0.3rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const JumbotronTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #343a40;
`

const JumbotronText = styled.p`
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #6c757d;
`

const JumbotronButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

// Componente Jumbotron
const Jumbotron = ({
  title,
  description,
  onClick,
  children,
}: {
  title: string
  description: string
  onClick: () => void
  children?: React.ReactNode
}) => {
  return (
    <JumbotronContainer>
      <JumbotronTitle>{title}</JumbotronTitle>
      <JumbotronText>{description}</JumbotronText>
      {children && <div style={{ marginTop: '1rem' }}>{children}</div>}
      <JumbotronButton onClick={onClick}>Saiba Mais</JumbotronButton>
    </JumbotronContainer>
  )
}

export default Jumbotron
