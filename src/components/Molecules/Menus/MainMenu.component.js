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
    listItems: PropTypes.arrayOf(PropTypes.object),
    filter: PropTypes.string,
  };
  
  static defaultProps = {
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
    const { filter, data } = this.props;
    let menuItems = data.allFile.nodes

    const directoryTree = {};

    directoryTree.children = [];

    menuItems.forEach(item => {
      if (item.name !== 'index') {
        const itemDir = item.relativeDirectory;
        if (itemDir !== '') {
          directoryTree.children.push(
            {
              parent: itemDir,
              item: item
            }
          )
        }
      }
    })

    const state = this.state;

    const Toggle = (
      <div>
        <DownIcon
          className={`${state.toggled ? 'menu__icon--hidden menu__icon' : 'menu__icon'}`}
          aria-label="Toggle Open"
          onClick={this.toggle.bind(this)}
        />
        <UpIcon
          className={`${state.toggled ? 'menu__icon menu__icon--shown' : 'menu__icon menu__icon--hidden'}`}
          aria-label="Toggle Closed"
          onClick={this.toggle.bind(this)}
        />
      </div>
    );

    const mainMenu = (
      <nav className="main-nav">
        <ul className="main-menu">
          {
            directoryTree.children.map(function (menuItem, state) {
              return (
                <div key={menuItem.item.id}>
                  <span className="menu-item">
                    {menuItem.parent}
                    {Toggle}
                  </span>
                  <ul className={`menu-child ${state.toggled ? 'menu-child--open' : ''}`}>
                    <ListItem
                      filter={filter}
                      item={menuItem.item}
                      key={menuItem.item.id}
                      itemName={menuItem.item.name}
                      itemLink={menuItem.item.childMarkdownRemark.fields.slug}
                      icon
                    />
                  </ul>
                </div>
                )
              })
            }
        </ul>
      </nav>
    )

    return mainMenu
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
          nodes {
            relativeDirectory
            name
            childMarkdownRemark {
              id
              frontmatter {
                title
              }
              fields {
                slug
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
