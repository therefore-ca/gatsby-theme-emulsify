import PropTypes from "prop-types"
import React, { Component } from "react"

import DownIcon from "../../Atoms/Icons/Down.component"
import UpIcon from "../../Atoms/Icons/Up.component"

/**
 * Component that renders a list item.
 */
export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.object,
    itemName: PropTypes.string,
    itemLink: PropTypes.string,
    children: PropTypes.node,
    key: PropTypes.string,
    filter: PropTypes.string,
  };
  
  static defaultProps = {
    item: [],
    itemName: null,
    itemLink: null,
    children: [],
    key: null,
    filter: null
  };

  state = { toggled: false };

  toggle = () => {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }));
  };

  render() {
    const { item, itemName, itemLink, children, key, filter } = this.props;
    // console.log(this.props);
    if (item.node.fields.collection === filter) {
      if (children.props) {
        return (
          <li key={key}>
            <a href={itemLink}>{itemName}</a>
            <DownIcon
              className={`${this.state.toggled ? 'icon-hidden' : ''}`}
              aria-label="Toggle Open"
              onClick={this.toggle}
            />
            <UpIcon
              className={`${this.state.toggled ? 'icon-shown' : 'icon-hidden'}`}
              aria-label="Toggle Closed"
              onClick={this.toggle}
            />
            <div className={`menu-child ${this.state.toggled ? 'menu-child--open' : ''}`}>
              { children }
            </div>
          </li>
        );
      }
      else {
        return (
          <li key={key}>
            <a href={itemLink}>{itemName}</a>
          </li>
        );
      }
    }
    else {
      return null;
    }
  }
}
