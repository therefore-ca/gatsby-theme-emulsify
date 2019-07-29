import React from "react";
import { storiesOf } from "@storybook/react";

import Header from "./Header/Header.component";
import Main from "./Main/Main.component";

/**
 * Add storybook definition for Sections.
 */
storiesOf("Organisms/Sections", module)
  .add("Header", () => <Header siteTitle={"Emulsify Gatsby"} />)
  .add("Main", () => <Main />);
