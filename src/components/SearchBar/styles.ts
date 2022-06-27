import styled from "styled-components";
import { OutlinedInput } from "@mui/material";
import { NavLink } from "react-router-dom";

//Hooks
import { devices } from "../../hooks/useMedia";

//theme
import { colors } from "../../theme/theme";

export const Container = styled.div`
  background-color: ${colors.primary};
  box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  height: 42px;
  position: sticky;
  top: 0;
  z-indez: 999;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px 0px 16px;
`;

export const Title = styled.span`
  font-size: 24px;
  color: ${colors.secondary};
  font-weight: bold;
`;

// eslint-disable-next-line prettier/prettier
export const Search = styled(OutlinedInput) <{ media: devices }>`
  height: 32px;
  margin-left: ${({ media }) => (media === "desktop" ? "32px" : "16px")};
  flex: 1;
  display: flex;
  max-width: 500px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${colors.secondary};
  text-decoration: none;
  margin-left: 16px;
  font-size: 16px;
`;

export const LeftContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`;

export const RightContainer = styled.div`
  align-items: center;
  display: flex;
`;
