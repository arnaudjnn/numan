export default {
  baseStyle: {
    borderRadius: "2xl",
  },
  variants: {
    solid: {
      py: 7,
      color: "black",
      bg: "rgb(255 207 0)",
      _hover: {
        bg: "rgb(255 207 0)",
        _disabled: {
          bg: "rgb(255 207 0)",
        },
      },
      _active: {
        bg: "rgb(255 207 100)",
      },
      _disabled: {
        bg: "rgb(255 207 0)",
      },
    },
  },
};
