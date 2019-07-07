import React, { Component } from "react"
import "./main.css"

import Sidebar from "../Sidebar/Sidebar.component"

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  render() {
    const { title, siteTitle, html, pages } = this.props;
    return (
      <div className={this.state.isMenuOpen ? 'main-open main' : 'main'}>
        <Sidebar
          pages={pages}
          siteTitle={siteTitle}
          toggleOpen={this.props.toggleOpen} 
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
