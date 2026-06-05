import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "yellow",

  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },

  headings: {
    fontWeight: "400",
    sizes: {},
  },

  // do not use because this inline styles
  components: {},
});
