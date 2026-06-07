import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spotlight } from "./Spotlight";

const meta: Meta<typeof Spotlight> = {
  component: Spotlight,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Spotlight>;

export const Default: Story = {
  args: {},
};

export const LukeSkywalker: Story = {
  args: {
    name: "Luke Skywalker",
    image: <img src="https://placehold.co/300x300" alt="Luke Skywalker" />,
  },
};

export const Empty: Story = {};
