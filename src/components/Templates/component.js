import React, { Component } from "react"
import { graphql } from "gatsby"

import LayoutComponent from "./layout-component"
import SEO from "./seo"

export default class ComponentTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const site = this.props.data.site
    const allPages = this.props.data.allMarkdownRemark
    return (
      <LayoutComponent
        title={siteTitle}
        {...site}
        {...post}
        {...allPages}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          keywords={[`gatsby`, `application`, `react`]}
        />
      </LayoutComponent>
    );
  }
}

export const pageQuery = graphql`
  query ComponentBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
      }
    }
    allMarkdownRemark {
      edges {
        node {
          id
          fields {
            slug
            collection
            parentDir
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
