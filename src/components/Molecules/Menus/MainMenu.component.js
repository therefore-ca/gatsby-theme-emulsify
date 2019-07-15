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
        [item.parent]: [...parentItem, item]
      };
    }, {});

    console.log(groupedMenuItems);
    console.log(directoryTree.children)
    // var nodes = directoryTree.children,
    // tree = function (data, root) {
    //     var r = [], o = {};
    //     data.forEach(function (a) {
    //         if (o[a.id] && o[a.id].children) {
    //             a.children = o[a.id] && o[a.id].children;
    //         }
    //         o[a.id] = a;
    //         if (a.pid === root) {
    //             r.push(a);
    //         } else {
    //             o[a.pid] = o[a.pid] || {};
    //             o[a.pid].children = o[a.pid].children || [];
    //             o[a.pid].children.push(a);
    //         }
    //     });
    //     return r;
    // }(nodes, 0);

    // let parents = [];
    // directoryTree.children.forEach(child => {
    //   if (!parents.includes(child.parent)) {
    //     parents.push(child.parent)
    //   }
    //   let parentsObject = Object.assign({}, parents);
    //   for (let [key, value] of Object.entries(parentsObject)) {
    //     if (child.parent === value) {
    //       parentsObject[key].push(child)
    //     }
    //   }
    // })

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
                <Menu menu={menu} filter="components" id={id} />
              </li>
              )
            }
          }, this)
        }
      </div>
    )
  }
}
