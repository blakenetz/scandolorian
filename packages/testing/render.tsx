import { render as rtlRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';

export function render(ui: React.ReactElement) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <MantineProvider
        env="test"
      >
        {children}
      </MantineProvider>
    ),
  });
}