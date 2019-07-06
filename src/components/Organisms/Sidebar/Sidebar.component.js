import PropTypes from "prop-types"
import React, { Component } from "react"
import "./sidebar.css"

import DownIcon from "../../Atoms/Icons/Down.component"
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

  state = { isMenuOpen: false };

  toggleOpen = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };

  open = () => {
    this.props.toggleOpen();
  }

  render() {
    const { pages, siteTitle } = this.props;
    return (
      <div className="sidebar">
        <div className="sidebar__inner">
          <h1>
            <Link to="/">
              {siteTitle}
            </Link>
            <DownIcon
              onClick={this.open}
              aria-label="Close Overlay"
            />
          </h1>
          <MainMenu listItems={pages} filter="pages" />
          <footer>
            © {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    )
  }
}
