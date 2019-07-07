import PropTypes from "prop-types"
import React, { Component } from "react"
import { graphql, StaticQuery } from 'gatsby'
import "./main-menu.css"

import DownIcon from "../../../../assets/down.svg"
import UpIcon from "../../../../assets/up.svg"
import ListItem from "../../Atoms/ListItem/ListItem.component"

/**
 * Component that renders the main menu.
 */
class MainMenu extends Component {
  static propTypes = {
    large: PropTypes.bool,
    listItems: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
  };
  
  static defaultProps = {
    large: null,
    listItems: [],
    filter: null
  };

  state = { toggled: false };

  toggle = () => {
    this.setState(prevState => ({
      toggled: !prevState.toggled
    }));
  };

  render() {
    const { large, filter, data } = this.props;
    let menuItems = data.allFile.nodes

    const directoryTree = {};

    directoryTree.children = [];

    menuItems.forEach(item => {
      if (item.name !== 'index') {
        const itemDir = item.relativeDirectory.split('/');
        if (itemDir !== '') {
          if (itemDir.length === 2) {
            directoryTree.children.push(
              {
                parent: itemDir[0],
                child: itemDir[1],
                item: item
              }
            );
          }
          else {
            directoryTree.children.push(
              {
                child: itemDir[0],
                item: item
              }
            )
          }
        }
      }
    })

    let childElement;
    // console.log(directoryTree.children.length)
    for (let i = 0; i < directoryTree.children.length; i++) {
      const menuItem = directoryTree.children[i];
      childElement = (
        <div>
          <li className="menu-item">
            {menuItem.parent}
            <DownIcon
              className={`${this.state.toggled ? 'menu__icon--hidden menu__icon' : 'menu__icon'}`}
              aria-label="Toggle Open"
              onClick={this.toggle}
            />
            <UpIcon
              className={`${this.state.toggled ? 'menu__icon menu__icon--shown' : 'menu__icon menu__icon--hidden'}`}
              aria-label="Toggle Closed"
              onClick={this.toggle}
            />
          </li>
          <ul className={`menu-child ${this.state.toggled ? 'menu-child--open' : ''}`}>
            <li className="menu-item">{menuItem.child}</li>
            <ul>
            <ListItem
              filter={filter}
              item={menuItem.item}
              key={menuItem.item.id}
              itemName={menuItem.item.name}
              itemLink={menuItem.item}
              icon
            />
            </ul>
          </ul>
        </div>
      )
    }

    return (
      <ul className={`main-menu ${large ? 'main-menu--large' : ''}`}>
        {childElement}
      </ul>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allDirectory(filter: {sourceInstanceName: {eq: "pages"}}) {
          nodes {
            name
            relativeDirectory
          }
        }
        allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
          nodes {
            relativeDirectory
            name
            children {
              ... on MarkdownRemark {
                id
                frontmatter {
                  title
                }
              }
            }
          }
        }
        allMarkdownRemark(filter: {fields: {collection: {eq: "pages"}}, frontmatter: {title: {ne: "Home"}}}) {
          group(field: fields___parentDir) {
            edges {
              node {
                frontmatter {
                  title
                }
                fields {
                  parentDir
                }
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <MainMenu data={data} />
    )}
  />
)
