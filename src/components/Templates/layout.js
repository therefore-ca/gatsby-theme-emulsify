/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import "./layout.css"

import Site from "./Site.js"

export default class Layout extends Component {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query SiteQuery {
            site {
              siteMetadata {
                title
              }
            }
            allMarkdownRemark(
              filter: {frontmatter: {title: { eq: "Welcome" }}},
            ) {
              nodes {
                frontmatter {
                  title
                }
              }
            }
          }
        `}
        render={(data, props) => (
          <Site {...data} {...props} />
        )}
      />
    );
  }
}
