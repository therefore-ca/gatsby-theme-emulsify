/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react"

import Site from "./Site.js"

export default class ComponentLayout extends Component {
  render() {
    const { post, title, edges, siteMetadata, fields, id, nodes, parentDirectory } = this.props
    const frontmatter = post.frontmatter;
    const body = post.body;
    return (
      <Site collection={post.fields.collection} id={post.id} menu={nodes} fields={fields} frontmatter={frontmatter} body={body} title={title} edges={edges} designSystems={siteMetadata.designSystems} parentDirectory={parentDirectory} />
    );
  }
}
