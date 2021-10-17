import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Form = styled.form`
  width: 90%;
  height: 70%;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  margin: auto;
  margin-top: 2%;
  background: white;
  overflow-y: auto;
`;

export const DivInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  margin-top: 20px;
  max-width: 800px;
  margin-left: 20%;

  input {
    margin-top: 12px;
    margin-left: 14px;
    width: 200px;
    height: 30px;
    border: none;
    border-radius: 8px;
    margin-right: 5px;
    background: #edf2f4;

    :nth-child(3) {
      width: 1000px;
    }
    ::placeholder {
      color: #bfbfbf;
    }
  }
`;

export const RemoveButton = styled.button`
  background: #f94144;
  margin-top: 12px;
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
  margin-top: 12px;
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
    width: 45%;
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
  width: 15%;
  height: 100%;
  max-height: 100px;
  border-radius: 8px;
  margin-top: 10px;
  font-weight: bold;
  margin: auto;
  background: #3a81c3;
  color: #fff;
  padding: 0 40px;
  font-size: large;
  /* margin-top: 20px; */
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
