import React from "react"
import { renderToString } from 'react-dom/server'
import { graphql } from "gatsby"
import { MDXProvider } from '@mdx-js/react'
import ComponentLayout from "./component-layout"
import SEO from "./seo"
import "./layout.css"

// Components for MDX
import ComponentViewer from '../Atoms/ComponentViewer/ComponentViewer.component'
import CodeSnippet from '../Atoms/CodeSnippet/CodeSnippet.component'

export default (props) => {
    const { pageContext } = props;
    const [components] = React.useState({
      ComponentViewer: (props) => !pageContext.iframePath === null ? 'Error: No Component Found' : <ComponentViewer url={`${window.origin}/${pageContext.iframePath}`} />,
      CodeSnippet: (props) => !pageContext.twigCode === null ? 'Error: No Code Found' : <CodeSnippet code={ `${pageContext.twigCode}`} />
    })
    const post = props.data.mdx
    const site = props.data.site
    const allPages = props.data.allMdx
    const allFile = props.data.allFile
    return (
      <MDXProvider components={components}>
        <ComponentLayout
          title={site.siteMetadata.title}
          {...site}
          post={post}
          {...allPages}
          {...allFile}
          parentDirectory={props.pageContext.parentDir}
        >
          <SEO
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            keywords={[`gatsby`, `application`, `react`]}
          />
        </ComponentLayout>
      </MDXProvider>
    );
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
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        description
        tab
      }
      fields {
        parentDir
        collection
      }
    }
    allMdx {
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
            tabOrder
          }
        }
      }
    }
    allFile {
      nodes {
        sourceInstanceName
        relativeDirectory
        name
        childMdx {
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
