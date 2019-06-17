import React, { Component } from "react"
import PropTypes from "prop-types"
import icon from './down.svg';
import "./down.css"

export default class DownIcon extends Component {
  render() {
    const { onClick, className } = this.props;

    return (
      <svg
        className={`${'down-icon'} ${className}`}
        onClick={onClick}
      >
        <use xlinkHref={`#${icon.id}`} />
      </svg>
    );
  }
}

DownIcon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

DownIcon.defaultProps = {
  onClick: () => {},
  className: '',
};
