import PropTypes from "prop-types"
import React, { Component } from "react"

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

    return (
      <li className="menu-item" key={key}>
        <a className="menu-link" href={itemLink}>{listItemContent.title}</a>
        {children}
      </li>
    );
  }
}
