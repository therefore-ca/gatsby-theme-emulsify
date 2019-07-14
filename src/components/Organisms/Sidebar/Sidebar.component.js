import PropTypes from "prop-types"
import React, { Component } from "react"
import "./sidebar.css"
import "./sidebar-design.css"

import DownIcon from "../../../../assets/down.svg"
import MenuIcon from "../../../../assets/menu-bars.svg"
import MainMenu from "../../Molecules/Menus/MainMenu.component"

const Link = process.env.STORYBOOK_ENV
  ? ({ children }) => children
  : require('gatsby').Link

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  static propTypes = {
    siteTitle: PropTypes.string,
  };

  static defaultProps = {
    siteTitle: ``,
  };

  open = () => {
    this.props.toggleOpen();
  }

  render() {
    const { siteTitle, menu, id, collection } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <div className="sidebar__header">
            <DownIcon
              className="parent-menu__toggle parent-menu__toggle--open"
              onClick={this.open}
              aria-label="Toggle Parent Menu"
            />
            <h1 className="sidebar__title">
              <Link to="/">
                {siteTitle}
              </Link>
            </h1>
            <MenuIcon
              className="sidebar__toggle"
              aria-label="Toggle Sidebar Menu"
            />
          </div>
          <nav className="sidebar__nav">
            <ul className="main-menu">
              <MainMenu menu={menu} id={id} filter="pages" collection={collection} />
            </ul>
          </nav>
          <footer className="sidebar__footer">
            Design System Powered by <a href="http://emulsify.info" target="_blank" rel="noopener noreferrer"><strong>Emulsify</strong></a>
          </footer>
        </div>
      </div>
    )
  }
}
