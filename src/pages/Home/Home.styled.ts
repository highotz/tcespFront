import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  @media (max-width: 800px) {
    flex-direction: column;
    position: relative;
  }
`;

interface Props {
  open: boolean;
}

export const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* border: solid 1px; */
`;

export const NavBar = styled.nav`
  width: 100%;
  height: 6%;
  background: #3a81c3;
  display: flex;
  margin-bottom: 2%;
  /* border-top-left-radius: 10px;
  border-bottom-left-radius: 10px; */
`;
export const Resume = styled.section`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

export const Graphs = styled.section`
  width: 96%;
  height: 45%;
  display: flex;
  margin: 2%;
  justify-content: space-between;

  div {
    background: #8d99ae;
    width: 45%;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const TopProblems = styled.section`
  width: 98%;
  height: 45%;
  display: flex;
  /* border: solid 1px; */
  margin: 1%;
  justify-content: space-between;

  div {
    background: #8d99ae;
    width: 45%;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
