const _ = require("lodash")
const {
  createFilePath
} = require(`gatsby-source-filesystem`)
const path = require('path');
const util = require('util')
const Twig = require('twig');
const renderTwig = util.promisify(Twig.renderFile);

const IN_PRODUCTION = process.env.NODE_ENV === 'production';

Twig.cache(IN_PRODUCTION);

function relativeDirEq(value) {
  return file => file.relativeDirectory === value
}

/**
 * Uses the presence of published md files as a way to decide what assets should show in the styleuide and groups them together.
 */
function createAssetMap(mdFiles, twigFiles, cssFiles, jsFiles) {
  const dirs = {};
  return mdFiles.reduce((acc, current) => {
    const mdParentDir = current.fields.parentDir;
    if (!dirs[mdParentDir]) {
      dirs[mdParentDir] = true;
      return [...acc, {
        // Organize assets that are in the same directory as the published md file
        cssFiles: cssFiles.filter(relativeDirEq(mdParentDir)),
        jsFiles: jsFiles.filter(relativeDirEq(mdParentDir)),
        twigFile: twigFiles.find(relativeDirEq(mdParentDir))
      }]
    }

    return acc;
  }, [])

}

exports.createPages = ({
  actions,
  graphql
}) => {
  const {
    createPage,
    deletePage
  } = actions

  const ComponentPost = require.resolve(`./src/components/Templates/layout.js`)
  const IsolatedTwigComponent = require.resolve(`./src/components/Templates/IsolatedTwigComponent.js`)

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: {frontmatter: {publishToStyleGuide: {eq: true}}}
      ) {
        nodes {
          fields {
            parentDir
            slug
          }
          frontmatter {
            title
            description
            publishToStyleGuide
          }
        }
      }
      twigFiles: allFile(filter: {extension: {eq: "twig"}}) {
        nodes {
          extension
          relativePath
          relativeDirectory
          absolutePath
          # DO NOT REMOVE: ctime is needed to bust gatsby cache for live reloading.
          ctime
          name
          base
        }
      }
      jsFiles: allFile(filter: {extension: {eq: "js"}}) {
        nodes {
          extension
          relativePath
          relativeDirectory
          # DO NOT REMOVE: ctime is needed to bust gatsby cache for live reloading.
          ctime
          absolutePath
          name
          base
        }
      }
      cssFiles: allFile(filter: {extension: {eq: "css"}}) {
        nodes {
          extension
          relativePath
          relativeDirectory
          # DO NOT REMOVE: ctime is needed to bust gatsby cache for live reloading.
          ctime
          absolutePath
          name
          base
        }
      }
      dataFiles: allFile(filter: {extension: {eq: "yml"}}) {
        nodes {
          extension
          relativePath
          relativeDirectory
          # DO NOT REMOVE: ctime is needed to bust gatsby cache for live reloading.
          ctime
          absolutePath
          name
          base
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create component pages.
    const mdFiles = result.data.allMarkdownRemark.nodes
    const twigComponents = result.data.twigFiles.nodes
    const cssFiles = result.data.cssFiles.nodes
    const jsFiles = result.data.jsFiles.nodes

    const assetMap = createAssetMap(mdFiles, twigComponents, cssFiles, jsFiles)

    mdFiles.forEach((mdFile) => {
      createPage({
        path: mdFile.fields.slug,
        component: ComponentPost,
        context: {
          slug: mdFile.fields.slug,
          collection: mdFile.fields.collection,
          parentDir: mdFile.fields.parentDir
        },
      })
    })

    assetMap.forEach((assets) => {
      const comp = assets.twigFile;
      if (comp) {
        const name = comp.name.replace(/\s+/g, '-').toLowerCase()
        createPage({
          path: `${name}-isolated`,
          component: IsolatedTwigComponent,
          context: {
            ...comp
          }
        })
      }
    })

  })
}

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const {
    createNodeField
  } = actions

  if (node.internal.type === `MarkdownRemark`) {
    let value = createFilePath({
      node,
      getNode
    }).toLowerCase()
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

  if (node.internal.type === 'SitePage' && node.context && node.context.extension === 'twig') {
    const name = node.context.base.replace(/\s+/g, '-').toLowerCase();
    // Render the twig component and add an componentHtml to the page
    // @TODO replace data with respective data yml file
    return renderTwig(node.context.absolutePath, {
      button_content: 'Hello world! 👋🏻'
    }).then(html => {
      // @TODO add fields for css/js files to be added to the page
      createNodeField({
        node,
        name: 'componentHtml',
        value: html,
      })
    })
  }
}