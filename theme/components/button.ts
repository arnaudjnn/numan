export default {
  baseStyle: {
    borderRadius: "xl",
  },
  variants: {
    solid: {
      py: 7,
      color: "white",
      bg: "black",
      _hover: {
        bg: "black",
        _disabled: {
          bg: "black",
        },
      },
      _active: {
        bg: "black",
      },
      _disabled: {
        bg: "black",
      },
    },
  },
};
