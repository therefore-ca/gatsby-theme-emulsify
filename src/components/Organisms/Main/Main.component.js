import React, { Component } from "react"
import { Link } from "gatsby"
import { MDXRenderer } from "gatsby-plugin-mdx";
import "./main.css"
import "./main-design.css"

import Sidebar from "../Sidebar/Sidebar.component"

/**
 * Component that renders the main area.
 */
export default class Main extends Component {
  
  render() {
    const { title, siteTitle, body, pages, parentDirectory, id, menu, collection } = this.props;
    let tabs = [];
    pages.forEach(page => {
      if (page.node.fields) {
        if (page.node.fields.parentDir === parentDirectory && page.node.frontmatter.tab) {
          tabs.push(page);
        }
      }
    })

    let tabsElement;
    if (tabs.length > 1) {
      tabs.sort(function(a, b) {
        return a.node.frontmatter.tabOrder - b.node.frontmatter.tabOrder
      })
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
          id={id}
          pages={pages}
          siteTitle={siteTitle}
          toggleOpen={this.props.toggleOpen}
          menu={menu}
          collection={collection}
        />
        <div className="main-content">
          <h1 className="main-title">{title}</h1>
          {tabsElement}
          <div className="main-content-content">
            <MDXRenderer>{body}</MDXRenderer>
          </div>
        </div>
      </div>
    )
  }
}
