/**
 * @file Button.component.js
 * Exports a button component.
 */

import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

/**
 * Component that renders a button with a click handler.
 */
const Button = props => {
  const { onClick, children } = props;

  return (
    <button type="button" className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node
};

Button.defaultProps = {
  children: null,
  onClick: () => {}
};

export default Button;
