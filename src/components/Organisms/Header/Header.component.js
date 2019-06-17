import PropTypes from "prop-types"
import React, { Component } from "react"
import "./Header.css"

import GridIcon from "../../Atoms/Icons/Grid.component"

const Link = process.env.STORYBOOK_ENV
  ? ({ children }) => children
  : require('gatsby').Link

/**
 * Component that renders the header.
 */
export default class Header extends Component {
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
    const { siteTitle } = this.props;
    return (
      <>
        <header>
          <div className="header-inner">
            <GridIcon
              onClick={this.open}
              aria-label="Close Overlay"
            />
            <h1>
              <Link to="/">
                {siteTitle}
              </Link>
            </h1>
          </div>
        </header>
      </>
    );
  }
}
