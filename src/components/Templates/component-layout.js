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
    const { frontmatter, body, title, edges, siteMetadata, fields, id, nodes } = this.props
    return (
      <Site menu={nodes} fields={fields} frontmatter={frontmatter} body={body} title={title} edges={edges} designSystems={siteMetadata.designSystems} id={id} />
    );
  }
}
