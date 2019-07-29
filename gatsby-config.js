const path = require("path");

module.exports = ({
  componentLibPath = "src/components",
  docPagesPath = "styleguide/pages",
  basePath = "/",
  designSystems = [
    {
      name: "System 1",
      link: "/"
    },
    {
      name: "System 2",
      link: ""
    }
  ],
  siteMetadata = {
    title: "Project Name",
    author: "Your Organization",
    description: "A Design System Driven by Gatsby"
  }
}) => ({
  pathPrefix: "/gatsby-theme-emulsify",
  siteMetadata: {
    ...siteMetadata,
    designSystems
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-plugin-page-creator",
      options: {
        path: path.join(__dirname, "src", "pages")
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `components`,
        path: path.join(basePath, componentLibPath)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.join(basePath, docPagesPath)
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/
        }
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`]
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`
  ]
});

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState();

  const dirs = [
    path.join(program.directory, "posts"),
    path.join(program.directory, "src/pages"),
    path.join(program.directory, "src/data")
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      mkdirp.sync(dir);
    }
  });
};
