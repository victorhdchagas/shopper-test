import styled from 'styled-components'
import { Text } from '../styled/text'

const Container = styled.div`
  display: flex;
  background-color: #333;
  justify-content: start;
  align-items: center;
  gap: 2px;
  img {
    margin-right: 10px;
  }
`
export default function MainHeader() {
  return (
    <Container>
      <a href="/">
        <img
          src="https://placehold.co/200x100"
          alt=""
          width={200}
          height={100}
        />
      </a>
      <Text>Shopper Taxi</Text>
    </Container>
  )
}
