import PropTypes from "prop-types"
import React, { Component } from "react"
import "./sidebar.css"
import "./sidebar-design.css"

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
          <div class="sidebar__header">
            <h1>
              <Link to="/">
                {siteTitle}
              </Link>
            </h1>
            <MenuIcon
              className="sidebar__toggle"
              onClick={this.open}
              aria-label="Toggle Overlay"
            />
          </div>
          <nav className="main-nav">
            <ul className="main-menu">
              <MainMenu menu={menu} id={id} filter="pages" collection={collection} />
            </ul>
          </nav>
          <footer>
            Design System Powered by <a href="http://emulsify.info" target="_blank" rel="noopener noreferrer"><strong>Emulsify</strong></a>
          </footer>
        </div>
      </div>
    )
  }
}
