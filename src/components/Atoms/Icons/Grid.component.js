import React, { Component } from "react"
import PropTypes from "prop-types"
import icon from './grid.svg';
import "./grid.css"

export default class GridIcon extends Component {
  render() {
    const { onClick } = this.props;

    return (
      <svg
        className="grid-icon"
        onClick={onClick}
      >
        <use xlinkHref={`#${icon.id}`} />
      </svg>
    );
  }
}

GridIcon.propTypes = {
  onClick: PropTypes.func
};

GridIcon.defaultProps = {
  onClick: () => {}
};
