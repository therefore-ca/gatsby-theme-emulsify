/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react"
import "./layout.css"

import Site from "./Site.js"

export default class ComponentLayout extends Component {
  render() {
    const { frontmatter, html, title, edges } = this.props
    return (
      <Site frontmatter={frontmatter} html={html} title={title} edges={edges} />
    );
  }
}
