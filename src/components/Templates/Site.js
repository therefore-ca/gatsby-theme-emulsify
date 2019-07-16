import PropTypes from "prop-types"
import React, { Component } from "react"
import "./site.css"

import Main from "../Organisms/Main/Main.component"

export default class Site extends Component {
  static propTypes = {
    frontmatter: PropTypes.object.isRequired,
  };

  state = { isMenuOpen: false };

  toggleOpen = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };

  render() {
    const { frontmatter, title, body, edges, designSystems, fields, id, menu, parentDirectory, collection } = this.props;
    return (
      <div
        className={this.state.isMenuOpen ? 'wrapper-open wrapper' : 'wrapper'}
      >

        <Main
          {...fields}
          {...frontmatter}
          id={id}
          body={body}
          collection={collection}
          menu={menu}
          pages={edges}
          parentDirectory={parentDirectory}
          siteTitle={title}
          toggleOpen={this.toggleOpen}
          designSystems={designSystems}
        />
      </div>
    );
  }
}
