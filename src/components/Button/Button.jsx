// import React from 'react';
import PropTypes from 'prop-types';
import css from './Button.module.css';

const Button = ({ onClick, children, ...ApplyProps }) => {
  return (
    <button
      className={css.Button}
      type="button"
      onClick={onClick}
      // {...ApplyProps}
    >
      {/* {children} */}
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = { onClick: PropTypes.func.isRequired };
