import React from 'react';
import PropTypes from 'prop-types';
// import './CommonButton.css';

const CommonButton = ({ label, onClick, disabled, className, id }) => {
  const buttonClass = `button ${className} ${disabled ? 'disable' : ''}`;

  return (
    <button
      id={id}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default CommonButton;
