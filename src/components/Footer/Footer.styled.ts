import styled from 'styled-components';

export const Footer = styled.footer`
  width: 100%;
  height: 4%;
  display: flex;

  justify-content: space-between;
  align-items: center;
  border-left: solid white 1px;

  background: #3a81c3; /* border: solid 1px; */

  p {
    color: white;
    font-weight: 600;
    font-family: 'Now';

    :first-child {
      margin-left: 1%;
    }

    :last-child {
      margin-right: 1%;
    }
  }
`;
