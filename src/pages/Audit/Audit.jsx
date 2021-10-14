/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';

import { GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { Select } from 'antd';
import { Container, Form, RemoveButton, AddButton } from './Audit.Styled';

const { Option } = Select;

const Audit = () => {
  const [formValues, setFormValues] = useState([
    { title: '', description: '' },
  ]);

  function handleChangeSelect(value) {
    console.log(`selected ${value}`);
  }
  // Forma functions
  const handleChange = (i, e) => {
    const newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    setFormValues([...formValues, { title: '', description: '' }]);
  };

  const removeFormFields = (i) => {
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(JSON.stringify(formValues));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <input type="hidden" name="id_audit" />
        {formValues.map((element, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Item"
              value={element.name || ''}
              onChange={(e) => handleChange(index, e)}
            />
            <Select
              placeholder="Status do Item"
              style={{ width: 150 }}
              onChange={() => handleChangeSelect}
            >
              <Option value="NOK">NOK</Option>
              <Option value="OK">OK</Option>
            </Select>

            <input
              type="text"
              name="comentarios"
              placeholder="Comentarios"
              value={element.name || ''}
              onChange={(e) => handleChange(index, e)}
            />

            {index === formValues.length - 1 ? (
              <AddButton type="button" onClick={() => addFormFields()}>
                <GrFormAdd />
              </AddButton>
            ) : null}
            {index ? (
              <RemoveButton
                type="button"
                onClick={() => removeFormFields(index)}
              >
                <GrFormSubtract />
              </RemoveButton>
            ) : null}
          </div>
        ))}
        <div className="button-section">
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </Container>
  );
};

export default Audit;
