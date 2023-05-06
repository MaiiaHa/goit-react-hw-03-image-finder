// import React, { Component } from 'react';
// import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';
import { FaSistrix } from 'react-icons/fa';

const Filter = ({ value, onChange }) => {
  return (
    <label className={css.inputFind}>
      <FaSistrix />
      Find contacts by name:
      <input
        className={css.inputFindField}
        type="text"
        placeholder="search"
        name="filter"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Filter;

// onChange={onChange}
