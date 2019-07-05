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
    const { large, filter, data } = this.props;
    const menuItems = data.allFile.nodes
    const directories = data.allDirectory.nodes

    const directoryTree = {};

    directories.forEach(dir => {
      if (dir.name !== 'pages') {
        if (dir.relativeDirectory) {
          directoryTree.children = [];
          directoryTree.children.push(
            {
              parent: dir.relativeDirectory,
              item: dir.name
            }
          );
        }
        else {
          directoryTree.item = dir.name;
        }
      }
    })
    console.log(directoryTree);

    // const directories = [];
    // menuItems.forEach(item => {
    //   let directory = item.relativeDirectory;
    //   // Make sure it has a parent directory.
    //   if (directory !== '') {
    //     // Create directory array.
    //     const directoryArray = directory.split('/');
    //     const menuItem = directoryArray.map(tree =>
          
    //     )
    //     directoryArray.forEach(item => {
    //       if (!directories.includes(item)) {
    //         directories.push(item);
    //       }
    //     });
    //   }
    // });
    // const directory = directoryTree.map(dir => {
    //   if (dir.children) {
    //     return (
    //       <div>
    //       <li>{dir.children[0].parent}</li>
    //       <ul key={dir.children[0].parent}>
    //         <li>{dir.item}</li>
    //       </ul>
    //       </div>
    //     )
    //   }
    //   else {
    //     return (
    //       <li>{dir.item}</li>
    //     )
    //   }
    // });
    

    const items = menuItems.map(item => (
      <ListItem
        filter={filter}
        item={item}
        key={item.id}
        itemName={item.name}
        itemLink={item}
        icon
      />
    ))

    let childElement;
    if (directoryTree.children[0].parent) {
      childElement = (
        <ul className={`main-menu ${large ? 'main-menu--large' : ''}`}>
          <li>{directoryTree.children[0].parent}</li>
          <ul>
            <li>{directoryTree.children[0].item}</li>
          </ul>
        </ul>
      )
    }
    else {
      childElement = (
        <ul className={`main-menu ${large ? 'main-menu--large' : ''}`}>
          <li>{directoryTree.item}</li>
        </ul>
      )
    }

    return childElement;
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
      }
    `}
    render={(data) => (
      <MainMenu data={data} />
    )}
  />
)
