import React from 'react';
import { storiesOf } from '@storybook/react';

import Main from "./Main/Main.component"

/**
 * Add storybook definition for Sections.
 */
storiesOf('Organisms/Sections', module)
  .add('Main', () => (
    <Main />
  ));
