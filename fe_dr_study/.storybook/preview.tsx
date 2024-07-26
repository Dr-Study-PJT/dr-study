import type { Preview } from "@storybook/react";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ThemeProvider } from "styled-components";
import Theme from "../src/themes/lightTheme";
import "./custom.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Foundation", "UI"],
      },
    },
  },

  decorators: [
    withThemeFromJSXProvider({
      themes: {
        light: Theme,
      },
      defaultTheme: "light",
      Provider: ThemeProvider,
    }),
  ],

  // tags: ["autodocs"],
};

export default preview;
