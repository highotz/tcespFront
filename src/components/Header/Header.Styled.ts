import styled from 'styled-components';

export const Container = styled.header`
  background: #3a81c3;
  // border: solid 1px;
  border-left: solid 1px white;
  max-height: 100px;
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    width: 250px;
    height: 100%;
    width: 22%;
    display: flex;
    align-items: center;
    margin-left: 2%;
  }
`;

export const Logo = styled.img`
  width: 70%;
  height: 80%;
`;
