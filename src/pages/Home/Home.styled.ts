import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

export const SideBar = styled.div<Props>`
  width: ${({ open }) => (open ? '20%' : '5%')};
  height: ${({ open }) => (open ? '100%' : '5%')};
  background: ${({ open }) => (open ? '#9a3233' : 'none')};
  display: flex;
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-70%)')};
  transition: width 0.3s ease-in-out;
  flex-direction: column;
  font-size: 14px;

  button {
    color: ${({ open }) => (open ? 'white' : 'black')};
    width: ${({ open }) => (open ? '17%' : '60%')};
    height: ${({ open }) => (open ? '4%' : '80%')};
    background: none;
    position: absolute;
    border: solid 1px;
    border-radius: 3px;
    cursor: pointer;
    margin-top: ${({ open }) => (open ? '4%' : '13%')};
    margin-left: ${({ open }) => (open ? '80%' : '90%')};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ease width 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }

  div {
    margin-top: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
  }
`;

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
  background: #9a3233;
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

export const Footer = styled.footer`
  width: 95%;
  height: 4%;
  display: flex;
  margin-left: 20px;
  justify-content: space-between;
  align-items: center;
  /* border: solid 1px; */

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
