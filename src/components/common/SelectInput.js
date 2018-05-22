import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectWrapper = styled.div`
width: 20%;
margin-left: auto;
`

const Select = styled.select`
float: right;
`

const SelectInput = ({ name, label, onChange, defaultOption, value, options }) => {
  return (
    <SelectWrapper className="form-group">
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <Select
          name={name}
          value={value}
          onChange={onChange}
          className="form-control"
          >
          <option value="">{defaultOption}</option>
          {options.map((option) => {
            return <option key={option.value} value={option.value}>{option.text}</option>;
          })
          }
        </Select>
      </div>
    </SelectWrapper>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};

export default SelectInput;