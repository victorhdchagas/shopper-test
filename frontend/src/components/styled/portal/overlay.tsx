import styled from 'styled-components'

export const PortalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px); /* Ajuste o valor conforme necessário */
`
