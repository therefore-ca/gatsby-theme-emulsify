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
          // Mark the item active if its id is the same as the id of the current page.
          let isActive = item.childMarkdownRemark.id === id;
          if (!isActive) {
            // Also mark the item active if the current page id corresponds to a menu item that shares a prefix with the Code item (sibling).
            let prefix = item.childMarkdownRemark.fields.slug.replace('code/', '');
            let siblings = menu.filter(
              menuitem => menuitem.childMarkdownRemark.id === id && menuitem.childMarkdownRemark.fields.slug.startsWith(prefix)
            );
            isActive = siblings.length > 0;
          }

          directoryTree.children.push(
            {
              item: item,
              active: isActive,
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
