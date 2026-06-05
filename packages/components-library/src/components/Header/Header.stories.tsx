import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
export const SubHeader: Story = {
  args: {
    children: (
      <nav>
        {Array.from({ length: 5 }).map((_el, i) => (
          <span key={i}>{`Route ${i + 1}`}</span>
        ))}
      </nav>
    ),
  },
};
