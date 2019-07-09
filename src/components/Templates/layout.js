import React, { Component } from "react"
import { graphql } from "gatsby"

import ComponentLayout from "./component-layout"
import SEO from "./seo"

export default class Layout extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const site = this.props.data.site
    const allPages = this.props.data.allMarkdownRemark
    const allFile = this.props.data.allFile
    return (
      <ComponentLayout
        title={site.siteMetadata.title}
        {...site}
        {...post}
        {...allPages}
        {...allFile}
      >
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
          keywords={[`gatsby`, `application`, `react`]}
        />
      </ComponentLayout>
    );
  }
}

export const pageQuery = graphql`
  query ComponentBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        designSystems {
          name
          link
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        tab
      }
      fields {
        parentDir
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
            tab
          }
        }
      }
    }
    allFile {
      nodes {
        sourceInstanceName
        relativeDirectory
        name
        childMarkdownRemark {
          id
          frontmatter {
            title
            tab
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
