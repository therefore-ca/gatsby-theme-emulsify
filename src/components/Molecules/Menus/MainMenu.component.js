import React, { Component } from "react"
import "./main-menu.css"

import DownIcon from "../../../../assets/down.svg"
import UpIcon from "../../../../assets/up.svg"
import ListItem from "../../Atoms/ListItem/ListItem.component"

/**
 * Component that renders the main menu.
 */
export default class MainMenu extends Component {
  state = { activeIndex: null };

  toggle = (index) => {
    this.setState({ activeIndex: index });
  };

  render() {
    const { menu, id } = this.props;
    let menuItems = menu

    const directoryTree = {};

    directoryTree.children = [];

    menuItems.forEach((item, i) => {
      if (item.name !== 'index' || item.name !== '404') {
        const itemDir = item.relativeDirectory;
        if (itemDir !== '') {
          directoryTree.children.push(
            {
              parent: itemDir,
              item: item,
              active: item.childMarkdownRemark.id === id ? true : false
            }
          )
        }
      }
    })

    // directoryTree.children.forEach((item, i) => {
    //   if (item.active === true) {
    //     this.state = { activeIndex: i };
    //   }
    // })

    return (
      <nav className="main-nav">
        <ul className="main-menu">
          {
            directoryTree.children.map(function(menuItem, i) {
              return (
                <li 
                  key={menuItem.item.childMarkdownRemark.id}
                  className={'menu-item' + `${menuItem.active ? ' menu-item--open' : ''}` + `${this.state.activeIndex===i ? ' menu-item--open' : ''}`}
                  onClick={this.toggle.bind(this, i)}
                >
                  <span>
                    {menuItem.parent}
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
                      itemLink={menuItem.item.childMarkdownRemark.fields.slug}
                      icon
                    />
                  </ul>
                </li>
                )
              }, this)
            }
        </ul>
      </nav>
    )
  }
}
