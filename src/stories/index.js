import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links'; 

import { Button, Welcome } from '@storybook/react/demo';
import Avatar from '../components/Avatar';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Avatar', module)
  .add('with no img path', () => <Avatar />)
  .add('with specific img path', () => <Avatar path="https://res.cloudinary.com/duo6ruqkc/image/upload/v1550848592/1550848426021_p0rczk.jpg" />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
