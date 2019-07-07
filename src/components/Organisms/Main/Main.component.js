import React, { Component } from "react"
import { Link } from "gatsby"
import "./main.css"

import Sidebar from "../Sidebar/Sidebar.component"

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  
  render() {
    const { title, siteTitle, html, pages, parentDir, id } = this.props;
    let tabs = [];
    pages.forEach(page => {
      if (page.node.fields) {
        if (page.node.fields.parentDir === parentDir && page.node.frontmatter.tab) {
          tabs.push(page);
        }
      }
    })

    let tabsElement;
    if (tabs.length > 1) {
      tabsElement = (
        <nav className="tabs">
          <ul>
            {tabs.map(tab => (
              <li key={tab.node.id}>
                <Link
                  to={tab.node.fields.slug}
                  className={tab.node.id === id ? 'active': ''}
                >
                  {tab.node.frontmatter.tab}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )
    }
    return (
      <div className="main">
        <Sidebar
          pages={pages}
          siteTitle={siteTitle}
          toggleOpen={this.props.toggleOpen} 
        />
        <div className="main-content">
          <h1 className="main-title">{title}</h1>
          {tabsElement}
          <div dangerouslySetInnerHTML={{ __html: html }} className="main-content-content" />
        </div>
      </div>
    )
  }
}