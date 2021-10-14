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
    border: solid blue 1px;
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
