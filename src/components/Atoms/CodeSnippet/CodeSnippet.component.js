/**
 * @file CodeSnippet.component.js
 * Exports a CodeSnippet component.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Highlight, { defaultProps } from "prism-react-renderer";

/**
 * Component that renders a CodeSnippet.
 */
const CodeSnippet = props => {
  const { code } = props;

  return (
    <Highlight {...defaultProps} code={props.code.trim()} language="jsx">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

CodeSnippet.propTypes = {
  code: PropTypes.string,
};

CodeSnippet.defaultProps = {
  code: `// No code specified.`,
};

export default CodeSnippet;
