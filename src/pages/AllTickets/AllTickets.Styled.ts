import styled from 'styled-components';

export const Content = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
`;

export const Breadcrumb = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  background: #ffffff;
  strong {
    margin-left: 2px;
    font-family: 'Now';
    color: #adb5bd;
    font-size: 1em;

    :nth-child(1) {
      margin-left: 10px;
    }
  }
`;

export const Find = styled.div`
  margin-top: 2%;
  height: 10%;
  width: 95%;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  margin-left: 3%;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  button {
    width: 8%;
    height: 50%;
    margin-left: 10px;
    border-radius: 8px;
    font-weight: 500;
    background: #3a81c3;
    color: #fff;
    padding: 0 40px;
    font-size: large;
    font-weight: 600;
    font-family: 'Now';
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 0;
    padding: 0;
    transition: filter 0.2s;
    i {
      margin-left: 0px;
    }
    &:not(:disabled):hover {
      filter: brightness(0.9);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  form {
    display: flex;
    align-items: center;
    height: 90%;
    width: 85%;
    input {
      margin-left: 4%;
      width: 90%;
      height: 70%;
      border: none;
      border-radius: 8px;
      background: #edf2f4;
    }
  }
`;

export const Register = styled.div`
  margin-top: 3%;
  margin-left: 3%;
  height: 67%;
  width: 93%;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  flex-direction: column;

  h1 {
    color: black;
    padding: 0 40px;
    font-weight: 600;
    font-family: 'Now';
    margin-top: 5%;
    font-size: 1.8rem;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 50%;
    margin-top: 2%;

    input {
      margin-top: 2%;
      margin-left: 4%;
      width: 90%;
      height: 20%;
      border: none;
      border-radius: 8px;
      background: #edf2f4;
      :nth-child(1) {
        margin-top: 5%;
      }
    }
  }
`;

export const Button = styled.button`
  width: 20%;
  height: 20%;
  border-radius: 8px;
  font-weight: 500;
  margin: auto;
  background: #3a81c3;
  color: #fff;
  padding: 0 40px;
  font-size: large;
  font-weight: 600;
  font-family: 'Now';
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  padding: 0;
  transition: filter 0.2s;
  i {
    margin-right: 2px;
    margin-left: 0px;
  }
  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Table = styled.div`
  width: 95%;
  height: 90%;
  overflow-y: auto;
  margin-left: 3%;
  margin-top: 3%;
`;
