import styled from 'styled-components'

export const Button = styled.button`
  background-color: #007bff; /* Cor de fundo do botão */
  color: white; /* Cor do texto */
  border: none; /* Remove a borda padrão */
  border-radius: 4px; /* Bordas arredondadas */
  padding: 10px 20px; /* Espaçamento interno */
  font-size: 16px; /* Tamanho da fonte */
  cursor: pointer; /* Muda o cursor ao passar o mouse */
  transition: background-color 0.3s, transform 0.2s; /* Transições suaves */

  &:hover {
    background-color: #0056b3; /* Cor de fundo ao passar o mouse */
  }

  &:active {
    transform: scale(0.95); /* Efeito de clique */
  }

  &:disabled {
    background-color: #ccc; /* Cor de fundo quando desabilitado */
    cursor: not-allowed; /* Cursor de não permitido */
  }
`
