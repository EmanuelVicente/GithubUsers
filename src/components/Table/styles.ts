import styled from "styled-components";
import { OutlinedInput, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";

import { colors } from "../../theme/theme";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
  flex-direction: column;
`;

export const Title = styled.span`
  font-size: 24px;
  color: ${colors.secondary};
  font-weight: bold;
`;

export const Search = styled(OutlinedInput)`
  height: 32px;
  margin-left: 32px;
  flex: 1;
  display: flex;
  max-width: 500px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${colors.secondary};
  text-decoration: none;
  margin-left: 16px;
  font-size: 16px;
  color: ${colors.secondary};
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

export const CircularProgressStyled = styled(CircularProgress)`
  margin-top: 16px;
`;
