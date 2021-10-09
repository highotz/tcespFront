import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface Props {
  open: boolean;
}
interface PropsLink {
  currentPage: boolean;
}

export const SideBar = styled.div<Props>`
  width: ${({ open }) => (open ? '20%' : '5%')};
  height: ${({ open }) => (open ? '100%' : '5%')};
  max-width: 340px;
  background: ${({ open }) => (open ? '#3A81C3' : 'none')};
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
    margin-top: 30%;
    display: flex;
    flex-direction: column;

    :nth-child(3) {
      margin-top: 6%;
    }

    li {
      list-style-type: none;
      margin-top: 5%;
    }
  }
`;

export const NavigationLinks = styled(Link)`
  text-decoration: none;
  font-size: 1.3rem;
  color: white;
  font-weight: ${(props: PropsLink) => (props.currentPage ? 'bold' : 500)};
  font-family: 'Now';
  display: flex;
  align-items: center;
  span {
    margin-right: 5%;
  }

  :hover {
    opacity: 0.7;
  }
`;

export const LogoDiv = styled.div`
  width: 90%;
  margin-top: 20px;
  margin-left: 5%;
  height: 10%;

  img {
    width: 100%;
    height: 100%;
  }
`;
export const DropDown = styled.div`
  display: flex;
  /* width: 95%;
  height: 52%; */
  margin-top: 20px !important;

  :hover {
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2px !important;
    }
  }
  div {
    width: 90%;
    display: none;
    z-index: 1;
    transition: all 0.3s ease-in;
  }
  i {
    margin: 0;
    border: none;
    font-style: normal;
    text-decoration: none;
    font-size: 1.3rem;
    color: white;
    font-weight: 300;
    cursor: pointer;
    font-family: 'Now';
    display: flex;
    align-items: center;
    margin-left: 0;
    padding: 0;
  }
`;
