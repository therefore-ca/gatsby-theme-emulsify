const path = require("path")

module.exports = {
  siteMetadata: {
    title: 'Emulsify',
    author: 'Four Kitchens',
    description: 'A Design System Driven by Gatsby',
    // siteUrl: '',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: path.join(__dirname, "src", "pages"),
      },
    },
    {
      resolve: "gatsby-plugin-compile-es6-packages",
      options: {
        modules: ["gatsby-theme-emulsify"],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: `${__dirname}/content/components`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: '@stackbit/gatsby-plugin-menus',
      options: {
        sourceUrlPath: `fields.url`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState()

  const dirs = [
    path.join(program.directory, "posts"),
    path.join(program.directory, "src/pages"),
    path.join(program.directory, "src/data"),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`)
      mkdirp.sync(dir)
    }
  })
}
