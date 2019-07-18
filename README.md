<h1 align="center">
  Emulsify Gatsby Theme
</h1>

<p align="center"> A Design System <em>Generator</em> powered by <a href="https://gatsbyjs.org">Gatsby</a> and using <a href="https://github.com/mdx-js/specification">MDX</a>.
</p>

## 🚀 Install

As a Gatsby theme, this project is not meant to be used directly but rather as a dependency in your Gatsby project or within a Gatsby Starter.

### Simple Project (not Starter)

1. Create a new project with a package.json (`npm init` or manually) with the following contents at least:

```
{
  ...
  "dependencies": {
    "gatsby": "^2.9.4",
    "gatsby-theme-emulsify": "~0.0.8",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  },
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build"
  }
}
```

2. `yarn` or `npm install`
3. Add the directory `styleguide/pages` (For your Styleguide Documentation.)
4. Add the directory `components`

### Starter

There is currently a starter for Drupal projects called [Gatsby Starter Emulsify (Drupal)](https://github.com/fourkitchens/gatsby-starter-emulsify-drupal), but more starters can be created.

Instructions for installing that starter can be found in that repo's [README file](https://github.com/fourkitchens/gatsby-starter-emulsify-drupal/blob/master/README.md).
