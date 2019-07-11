import React from 'react';
import { graphql } from 'gatsby';

export default class IsolatedTwigComponent extends React.Component {
  addJs = () => {
    const { data: { sitePage: { fields: { jsCode } } } } = this.props;
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.innerHTML = jsCode;
    document.body.appendChild(s);
  }

  addCss = () => {
    const { data: { sitePage: { fields: { cssCode } } } } = this.props;
    const s = document.createElement('style');
    s.type = 'text/css';
    s.innerHTML = cssCode;
    document.body.appendChild(s);
  }


  componentDidMount() {
    this.addJs();
    this.addCss();
  }
  componentDidUpdate() {
    this.addJs();
    this.addCss();
  }

  render() {
    const { data: { sitePage: { fields: { componentHtml } } } } = this.props;
    return <div dangerouslySetInnerHTML={{ __html: componentHtml }} />
  }
}

export const pageQuery = graphql`
  query IsolatedTwigComponentQuery($relativePath: String) {
    sitePage(context: { relativePath: { eq: $relativePath } }) {
      fields {
        componentHtml
        jsCode
        cssCode
      }
    }
  }
`
