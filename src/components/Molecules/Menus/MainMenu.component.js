import React, { Component } from "react"
import "./main-menu.css"
import "./main-menu-design.css"

import DownIcon from "../../../../assets/down.svg"
import UpIcon from "../../../../assets/up.svg"
import ListItem from "../../Atoms/ListItem/ListItem.component"
import Menu from "./Menu.component"

/**
 * Component that renders the main menu.
 */
export default class MainMenu extends Component {
  state = { activeIndex: null };

  toggle = (index) => {
    if (this.state.activeIndex !== index) {
      this.setState({ activeIndex: index });
    }
    else {
      this.setState({ activeIndex: null });
    }
  };

  render() {
    const { menu, id, filter, collection } = this.props;
    let menuItems = menu

    const directoryTree = {};
    directoryTree.children = [];

    menuItems.forEach((item) => {
      // Filter by filter prop.
      if (item.sourceInstanceName === filter) {
        // Not the following pages.
        if (item.name !== 'index' || item.name !== '404') {
          const itemDir = item.relativeDirectory;
          // Only if it has a parent directory.
          if (itemDir !== '') {
            directoryTree.children.push(
              {
                parent: itemDir,
                item: item,
                active: item.childMdx.id === id ? true : false
              }
            )
          }
        }
      }
    })

    directoryTree.children.sort(function(a, b) {
      if(a.parent[0] < b.parent[0]) { return -1; }
      if(a.parent[0] > b.parent[0]) { return 1; }
      return 0;
    })

    return (
      <div>
      {
        directoryTree.children.map(function(menuItem, i) {
          const menuParentTrimmed = menuItem.parent.split('__').pop()
          if (menuParentTrimmed === 'Components') {
            return (
              <li 
                key={menuItem.item.childMdx.id}
                className={`menu-item${collection === 'components' ? ' menu-item--open' : ''} ${this.state.activeIndex===i ? ' menu-item--open' : ''}`}
                onClick={this.toggle.bind(this, i)}
              >
                <span>
                  {menuParentTrimmed}
                    <DownIcon
                      className="menu-icon menu-icon--down"
                      aria-label="Toggle Open"
                    />
                    <UpIcon
                      className="menu-icon menu-icon--up"
                      aria-label="Toggle Closed"
                    />
                </span>
                <Menu menu={menu} filter="components" id={id} />
              </li>
            )
          }
          else {
            return (
              <li 
                key={menuItem.item.childMdx.id}
                className={`menu-item${menuItem.active ? ' menu-item--open' : ''} ${this.state.activeIndex===i ? ' menu-item--open' : ''}`}
                onClick={this.toggle.bind(this, i)}
              >
                <span>
                  {menuParentTrimmed}
                    <DownIcon
                      className="menu-icon menu-icon--down"
                      aria-label="Toggle Open"
                    />
                    <UpIcon
                      className="menu-icon menu-icon--up"
                      aria-label="Toggle Closed"
                    />
                </span>
                <ul className="menu-child">
                  <ListItem
                    active={menuItem.active}
                    item={menuItem.item}
                    key={menuItem.item.id}
                    itemName={menuItem.item.name}
                    itemLink={menuItem.item.childMdx.fields.slug}
                    icon
                  />
                </ul>
              </li>
              )
            }
          }, this)
        }
      </div>
    )
  }
}
