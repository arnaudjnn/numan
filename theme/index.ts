import Container from "./components/container";
import Button from "./components/button";
import Tabs from "./components/tabs";
import Input from "./components/input";

export const theme = {
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "56px",
    "7xl": "64px",
  },
  components: {
    Container,
    Button,
    Tabs,
    Input,
  },
};
