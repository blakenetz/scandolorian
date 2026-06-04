import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Click me'
  }
};