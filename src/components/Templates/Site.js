import React, { Component } from "react";
import PropTypes from "prop-types";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Sidebar from "../Organisms/Sidebar/Sidebar.component";
import Tabs from "../Organisms/Tabs/Tabs.component";

import "./site.css";
import "./main.css";
import "./main-design.css";

export default class Site extends Component {
  static propTypes = {
    frontmatter: PropTypes.object.isRequired
  };

  state = { isMenuOpen: false };

  toggleOpen = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen
    }));
  };

  render() {
    const {
      title,
      body,
      docPages,
      designSystems,
      id,
      menu,
      parentDirectory,
      collection
    } = this.props;
    let tabs = docPages
      .filter(
        docPage =>
          docPage.node.fields &&
          docPage.node.fields.parentDir === parentDirectory &&
          docPage.node.frontmatter.tab
      )
      .sort(function(a, b) {
        return a.node.frontmatter.tabOrder - b.node.frontmatter.tabOrder;
      });
    return (
      <div
        className={this.state.isMenuOpen ? "wrapper-open wrapper" : "wrapper"}
      >
        <div className="main">
          <Sidebar
            id={id}
            pages={docPages}
            siteTitle={title}
            toggleOpen={this.props.toggleOpen}
            menu={menu}
            collection={collection}
            designSystems={designSystems}
          />
          <div className="main-content">
            <h1 className="main-title">{title}</h1>
            {tabs.length ? <Tabs tabs={tabs} id={id} /> : null}
            <div className="main-content-content">
              <MDXRenderer>{body}</MDXRenderer>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
