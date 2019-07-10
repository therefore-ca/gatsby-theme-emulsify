const path = require("path")
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const ComponentPost = path.resolve(`./src/components/Templates/layout.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
      markdownRemark {
        fields {
          parentDir
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create component pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post) => {
      createPage({
        path: post.node.fields.slug,
        component: ComponentPost,
        context: {
          slug: post.node.fields.slug,
          collection: post.node.fields.collection,
          parentDir: post.node.fields.parentDir
        },
      })
    })

    return null
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({ node, getNode }).toLowerCase()
    value = value.replace(/\s+/g, '-').toLowerCase()
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    // Get the parent node
    const parent = getNode(_.get(node, 'parent'))
    createNodeField({
      node,
      name: 'collection',
      value: _.get(parent, 'sourceInstanceName'),
    })
    createNodeField({
      node,
      name: 'parentDir',
      value: _.get(parent, 'relativeDirectory'),
    })
  }
}
