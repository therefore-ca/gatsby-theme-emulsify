import React from 'react';
import { graphql } from 'gatsby';

// export default () => <div>lol</div>

export default ({ data: { sitePage: { fields: { componentHtml } } } }) => console.log(componentHtml) || <div dangerouslySetInnerHTML={{ __html: componentHtml }} />

export const pageQuery = graphql`
  query IsolatedTwigComponentQuery($relativePath: String) {
    sitePage(context: {relativePath: {eq: $relativePath}}) {
      fields {
        componentHtml
      }
    }
  }
`
