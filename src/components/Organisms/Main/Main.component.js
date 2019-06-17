import React, { Component } from "react"
import "./main.css"

import MainMenu from "../../Molecules/Menus/MainMenu.component"

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  render() {
    const { title, html, pages } = this.props;
    return (
      <div className="main">
        <MainMenu listItems={pages} filter="pages" />
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

