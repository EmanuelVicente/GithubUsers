import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

export const colors = {
  primary: "#fb573b",
  secondary: "#4f393c",
  gray: grey,
  white: "#FFFFFF",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.secondary,
    },
  },
});
