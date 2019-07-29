import React from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Site from "./Site";
import SEO from "./seo";
import "./layout.css";

// Components for MDX
import ComponentViewer from "../Atoms/ComponentViewer/ComponentViewer.component";
import CodeSnippet from "../Atoms/CodeSnippet/CodeSnippet.component";

export default props => {
  const { pageContext } = props;
  /**
   * These components are exposed to the style guide authors
   * so that they can use MDX to layout their component documentation, usage, etc.
   */
  const [components] = React.useState({
    Component: props =>
      !pageContext.iframePath === null ? (
        "Error: No Component Found"
      ) : (
        <ComponentViewer url={`${window.origin}/${pageContext.iframePath}`} />
      ),
    Code: props =>
      !pageContext.twigCode === null ? (
        "Error: No Code Found"
      ) : (
        <CodeSnippet code={`${pageContext.twigCode}`} />
      )
  });
  const post = props.data.mdx;
  const site = props.data.site;
  const docPages = props.data.allMdx.edges;
  const componentNodes = props.data.allFile.nodes;
  return (
    <MDXProvider components={components}>
      <Site
        collection={post.fields.collection}
        id={post.id}
        menu={componentNodes}
        fields={post.fields}
        frontmatter={post.frontmatter}
        body={post.body}
        title={site.siteMetadata.title}
        edges={docPages}
        designSystems={site.siteMetadata.designSystems}
        parentDirectory={props.pageContext.parentDir}
      />
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        keywords={[`gatsby`, `application`, `react`]}
      />
    </MDXProvider>
  );
};

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
`;
