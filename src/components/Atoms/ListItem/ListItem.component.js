import PropTypes from "prop-types"
import React, { Component } from "react"
import { Link } from "gatsby"

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
    const { item, itemLink, key, children, active } = this.props;
    const listItemContent = item.childMarkdownRemark.frontmatter;

    // const directories = [];
    // let directory = item.relativeDirectory;
    // directory = directory.split('/')
    // if (!directories.includes(directory)) {
    //   directories.push(directory);
    // }

    return (
      <li className={'menu-item--child' + `${active === true ? ' menu-item--child--active' : ''}`} key={key}>
        <Link className="menu-link" to={itemLink}>{listItemContent.title}</Link>
        {children}
      </li>
    );
  }
}
