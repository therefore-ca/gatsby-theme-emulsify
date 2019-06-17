import React, { Component } from "react"
import PropTypes from "prop-types"
import icon from './up.svg';
import "./down.css"

export default class UpIcon extends Component {
  render() {
    const { onClick, className } = this.props;

    return (
      <svg
      className={`${'up-icon'} ${className}`}
        onClick={onClick}
      >
        <use xlinkHref={`#${icon.id}`} />
      </svg>
    );
  }
}

UpIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

UpIcon.defaultProps = {
  onClick: () => {},
  className: '',
};
