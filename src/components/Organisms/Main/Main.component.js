import React, { Component } from "react"
import "./main.css"

import Sidebar from "../Sidebar/Sidebar.component"

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  state = { isMenuOpen: false };

  toggleOpen = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };
  
  render() {
    const { title, siteTitle, html, pages } = this.props;
    return (
      <div className="main">
        <Sidebar
          pages={pages}
          siteTitle={siteTitle}
          toggleOpen={this.toggleOpen.bind(this)} 
        />
        <div className="main-content">
          <h1 className="main-title">
          {title}
          </h1>
          <div dangerouslySetInnerHTML={{ __html: html }} className="main-content-content" />
        </div>
      </div>
    )
  }
}
