import styled from 'styled-components'

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 4px;
  & span:first-child {
    font-size: 14px;
    color: #cecefe;
    font-weight: bold;
  }
  & span:nth-child(2) {
    font-size: 12px;
    color: #cecece;
  }
`
