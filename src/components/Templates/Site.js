import PropTypes from "prop-types"
import React, { Component } from "react"
import "./site.css"

import Main from "../Organisms/Main/Main.component"
import MainMenu from "../Molecules/Menus/MainMenu.component"
import ListItem from "../Atoms/ListItem/ListItem.component"

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
    const { frontmatter, title, html, edges } = this.props;
    return (
      <div
        className={this.state.isMenuOpen ? 'wrapper-open wrapper' : 'wrapper'}
      >
        <div className="parent-menu">
          <MainMenu large>
            <ListItem
              itemName="Site 1"
              itemLink="#"
            />
            <ListItem
              itemName="Site 2"
              itemLink="#"
            />
          </MainMenu>
        </div>
        <Main
          {...frontmatter}
          html={html}
          pages={edges}
          siteTitle={title}
          toggleOpen={this.toggleOpen.bind(this)}
        />
      </div>
    );
  }
}
