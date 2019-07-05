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
    const { item, itemLink, key, children } = this.props;
    const listItemContent = item.children[0].frontmatter;

    // const directories = [];
    // let directory = item.relativeDirectory;
    // directory = directory.split('/')
    // if (!directories.includes(directory)) {
    //   directories.push(directory);
    // }

    // If the homepage, don't add to menu.
    if (item.name !== 'index') {
      if (item.relativeDirectory !== '') {
        return (
          <ul>
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
          </ul>
        );
      }
      else {
        return (
          <li key={key}>
            <a href={itemLink}>{listItemContent.title}</a>
          </li>
        );
      }
    }
    else {
      return null;
    }
  }
}
