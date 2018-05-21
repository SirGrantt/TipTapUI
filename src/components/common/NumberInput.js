import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({name, label, onChange, placeholder, value, error}) => {
    let wrapperClass = 'form-group';
    if(error && error.length > 0)
    {
        wrapperClass += " " + 'has-error';
    }
return(
    <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
            <div className="field">
                <input
                type="number"
                pattern="(\d{3})([\.])(\d{2})"
                name={name}
                className="form-control"
                placeholder={placeholder}
                value={value}
                onChange={onChange} />     
            </div>
    </div>
);
};
//{error && <div className="alert alert-danger">{error}</div>}

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default NumberInput;