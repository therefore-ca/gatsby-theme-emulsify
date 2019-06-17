import PropTypes from "prop-types"
import React, { Component } from "react"
import "./site.css"

import Header from "../Organisms/Header/Header.component"
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
    console.log(title);
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
        <div>
          <Header
            toggleOpen={this.toggleOpen.bind(this)}
            siteTitle={title}
          />
          <div>
            <Main {...frontmatter} html={html} pages={edges} />
            <footer>
              © {new Date().getFullYear()}
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
