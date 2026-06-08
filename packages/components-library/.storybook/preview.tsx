import type { Preview } from '@storybook/react-vite'
import { theme } from '@scandalorian/theme';
import {
  ColorSchemeScript,
  MantineProvider
} from '@mantine/core';
import '@mantine/core/styles.css';
import '@scandalorian/theme/styles.css'


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, _context) => {
      return (
        <MantineProvider
          theme={theme}
        >
          <ColorSchemeScript />
          <Story />
        </MantineProvider>
      );
    }
  ]
};

export default preview;