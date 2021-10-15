import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border: solid;
`;

export const Form = styled.form`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  border: solid;
  margin: auto;
  margin-top: 2%;
  background: white;
  div {
    display: flex;
    align-items: center;
    margin-top: 5px;
    max-width: 300px;

    :nth-child(1) {
      margin-top: 10px;
    }

    input {
      margin-top: 2%;
      margin-left: 4%;
      border: none;
      border-radius: 8px;
      margin-right: 5px;
      background: #edf2f4;
      :nth-child(1) {
        margin-top: 5%;
      }
    }
  }
`;

export const RemoveButton = styled.button`
  background: #f94144;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-left: 2px;

  font-weight: 500;
  color: #fff;
  border: 0;

  transition: filter 0.2s;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const AddButton = styled.button`
  background: #90be6d;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  margin-left: 2px;

  font-weight: 500;
  color: #fff;
  border: 0;

  transition: filter 0.2s;

  &:not(:disabled):hover {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Find = styled.div`
  margin-top: 2%;
  height: 10%;
  width: 23%;
  border-radius: 8px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin-left: 3%;
  justify-content: center;
  align-items: center;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.43);
  button {
    width: 50%;
    height: 60%;
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
