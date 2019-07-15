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
    });

    const groupedMenuItems = directoryTree.children.reduce((acc, item) => {
      const parentItem = acc[item.parent] || [];
      return {
        ...acc,
        [item.parent]: [...parentItem, item.item]
      };
    }, {});

    const isComponentsMenu = (name) => name === 'Components';
    const parentIsOpen = (i) => collection === 'components' || this.state.activeIndex === i;

    return (
      <div>
      {
        Object.keys(groupedMenuItems).map((parentKey, parentIndex) => {
          const parentName = parentKey.split('__').pop();
          return (
            <li
              key={parentIndex}
              className={`menu-item ${parentIsOpen(parentIndex) ? 'menu-item--open' : '' }`}
              onClick={this.toggle.bind(this, parentIndex)}
            >
              <span>
                {parentName}
                <DownIcon
                  className="menu-icon menu-icon--down"
                  aria-label="Toggle Open"
                />
                <UpIcon
                  className="menu-icon menu-icon--up"
                  aria-label="Toggle Closed"
                />
              </span>
              <Menu
                menu={isComponentsMenu(parentName) ? menu : groupedMenuItems[parentKey]}
                filter={isComponentsMenu(parentName) ? 'components' : 'pages'}
                id={id}
              />
            </li>
          )
        })
      }
      </div>
    );
  }
}
