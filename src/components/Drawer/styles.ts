import styled from "styled-components";
import { NavLink } from "react-router-dom";

//theme
import { colors } from "../../theme/theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 0px 16px;
`;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 16px;
`;

export const NavLinkStyled = styled(NavLink)`
  color: ${colors.secondary};
  text-decoration: none;
  font-size: 16px;
  margin-top: 16px;
`;
