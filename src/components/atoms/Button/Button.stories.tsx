import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Palette } from "../../../themes/lightTheme";

const meta = {
  title: "UI/Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "1rem" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: "버튼에 표시할 텍스트를 입력합니다.",
    },
    size: {
      description: "버튼의 크기를 설정합니다.",
      control: { type: "select", options: ["sm", "md", "lg", "xl"] },
    },
    variant: {
      description: "버튼의 타입을 설정합니다.",
      control: { type: "select", options: ["contained", "outlined", "text"] },
    },
    color: {
      description: "브랜드 컬러를 비롯해 사전 예약된 버튼 컬러를 설정합니다.",
      control: { type: "select", options: ["primary", "secondary", "danger"] },
    },
    disabled: {
      description: "버튼을 비활성화합니다.",
    },
    fullwidth: {
      description: "너비를 부모에 꽉차게 맞춥니다.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Button",
    size: "md",
    variant: "contained",
    color: "primary",
    disabled: false,
    fullwidth: "false",
  },
};

const colorList: Palette[] = ["primary", "secondary", "danger"];

export const Contained: Story = {
  args: {
    ...Primary.args,
    variant: "contained",
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {colorList.map((color) => (
        <Button {...args} color={color} key={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  args: {
    ...Primary.args,
    variant: "outlined",
  },
  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {colorList.map((color) => (
        <Button {...args} color={color} key={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};

export const Text: Story = {
  args: {
    ...Primary.args,
    variant: "text",
  },

  render: (args) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {colorList.map((color) => (
        <Button {...args} color={color} key={color}>
          {color}
        </Button>
      ))}
    </div>
  ),
};
