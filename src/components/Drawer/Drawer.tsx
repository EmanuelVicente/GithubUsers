import React, { memo } from "react";
import { Drawer as DrawerMaterial } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

//Styles
import { Container, NavLinkStyled, IconContainer } from "./styles";

declare interface DrawerProps {
  open: boolean;
  close: () => void;
}

const Drawer = ({ open, close }: DrawerProps) => {
  return (
    <DrawerMaterial open={open}>
      <Container>
        <IconContainer>
          <CloseIcon onClick={close} fontSize={"small"} />
        </IconContainer>
        <NavLinkStyled to="/users">
          <span>{"Users"}</span>
        </NavLinkStyled>
        <NavLinkStyled to="/repositories">
          <span>{"Repositories"}</span>
        </NavLinkStyled>
      </Container>
    </DrawerMaterial>
  );
};

export default memo(Drawer);
