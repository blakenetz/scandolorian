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
  args: {
    headline: "Luke Skywalker",
    content: [
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      "Id, exercitationem numquam explicabo error voluptatem eius blanditiis ea eos aut.",
      "Pariatur ipsum enim totam vero sit aliquam doloribus cumque similique quae?",
    ],
  },
};

export const Image: Story = {
  args: {
    ...Default.args,
    image: <img src="https://placehold.co/300x300" alt="Luke Skywalker" />,
  },
};

export const Link: Story = {
  args: {
    ...Default.args,
    link: (v) => <a href="#">{v}</a>,
  },
};
