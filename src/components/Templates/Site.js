import PropTypes from "prop-types"
import React, { Component } from "react"
import "./site.css"

import CloseIcon from "../../../assets/close.svg"
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
    const { frontmatter, title, html, edges, designSystems, fields, id, menu } = this.props;
    return (
      <div
        className={this.state.isMenuOpen ? 'wrapper-open wrapper' : 'wrapper'}
      >
        <nav className="parent-menu">
          <CloseIcon
            className="parent-menu__toggle"
            onClick={this.toggleOpen}
            aria-label="Toggle Overlay"
          />
          <ul>
            {designSystems.map(link => (
              <li key={link.name}>
                <a href={link.link}>{link.name}</a>
                </li>
            ))}
          </ul>
        </nav>
        <Main
          {...fields}
          {...frontmatter}
          id={id}
          html={html}
          menu={menu}
          pages={edges}
          siteTitle={title}
          toggleOpen={this.toggleOpen}
        />
      </div>
    );
  }
}
