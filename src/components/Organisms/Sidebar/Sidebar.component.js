import PropTypes from "prop-types"
import React, { Component } from "react"
import "./sidebar.css"

import DownIcon from "../../../../assets/down.svg"
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
    const { siteTitle, menu, id } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <h1>
            <Link to="/">
              {siteTitle}
            </Link>
            <DownIcon
              className="down-icon"
              onClick={this.open}
              aria-label="Close Overlay"
            />
          </h1>
          <MainMenu menu={menu} id={id} />
          <footer>
            Design System Powered by <a href="http://emulsify.info" target="_blank" rel="noopener noreferrer">Emulsify</a>
          </footer>
        </div>
      </div>
    )
  }
}
