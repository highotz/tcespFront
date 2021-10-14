import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  min-height: 680px;
  min-width: 1000px;
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
