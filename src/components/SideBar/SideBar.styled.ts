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
    margin-top: 20%;
    display: flex;
    flex-direction: column;

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
  i {
    margin-right: 5%;
  }

  :hover {
    opacity: 0.7;
  }
`;
