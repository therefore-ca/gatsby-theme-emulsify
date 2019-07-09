import React, { Component } from "react"

import ListItem from "../../Atoms/ListItem/ListItem.component"

/**
 * Component that renders a menu.
 */
export default class Menu extends Component {
  render() {
    const { menu, filter, id } = this.props;

    const directoryTree = {};
    directoryTree.children = [];

    menu.forEach((item) => {
      if (item.sourceInstanceName === filter) {
        if (item.name === 'Code') {
          directoryTree.children.push(
            {
              item: item,
              active: item.childMarkdownRemark.id === id ? true : false
            }
          )
        }
      }
    })

    return (
      <ul className="menu-child">
        {
          directoryTree.children.map(function(item, i) {
            return (
              <ListItem
                active={item.active}
                item={item.item}
                key={item.item.childMarkdownRemark.id}
                itemName={item.item.childMarkdownRemark.frontmatter.title}
                itemLink={item.item.childMarkdownRemark.fields.slug}
                icon
              />
            )
          })
        }
      </ul>
    )
  }
}
