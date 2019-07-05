import PropTypes from "prop-types"
import React, { Component } from "react"
import { graphql, StaticQuery } from 'gatsby'
import "./main-menu.css"

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

  render() {
    const { large, listItems, filter, data } = this.props;
    const menuItems = data.allFile.edges

    const directories = [];
    menuItems.forEach(item => {
      let directory = item.node.relativeDirectory;
      directory = directory.split('/')
      if (!directories.includes(directory)) {
        directories.push(directory);
      }
    });

    console.log(this.props);

    const items = listItems.map(item => (
      <ListItem
        filter={filter}
        item={item}
        key={item.node.id}
        itemName={item.node.frontmatter.title}
        itemLink={item.node.fields.slug}
        icon
        directories
      />
    ))

    return (
      <ul className={`main-menu ${large ? 'main-menu--large' : ''}`}>
        {items}
      </ul>
    )
  }
}

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allFile(filter: { sourceInstanceName: { eq: "pages" } }) {
          edges {
            node {
              name
              relativeDirectory
            }
          }
        }
        menus {
          main {
            identifier
            title
            url
            items {
              identifier
              title
              url
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
