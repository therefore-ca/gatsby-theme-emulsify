import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "gatsby";

/**
 * Component that renders a list item.
 */
export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemName: PropTypes.string,
    itemLink: PropTypes.string,
    children: PropTypes.node,
    filter: PropTypes.string
  };

  static defaultProps = {
    item: [],
    itemName: null,
    itemLink: null,
    children: [],
    filter: null
  };

  state = { toggled: false };

  toggle = () => {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }));
  };

  render() {
    const { item, itemLink, children, active } = this.props;
    const listItemContent = item.childMdx.frontmatter;

    return (
      <li
        className={`menu-item--child${
          active === true ? " menu-item--child--active" : ""
        }`}
      >
        <Link className="menu-link" to={itemLink}>
          {listItemContent.title}
        </Link>
        {children}
      </li>
    );
  }
}
