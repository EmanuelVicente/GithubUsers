import React, { memo, useMemo, useState } from "react";
import { Search as SearchIcon, Menu } from "@mui/icons-material";

// Components
import Drawer from "../Drawer/Drawer";

// Hooks
import useMedia from "../../hooks/useMedia";

// Styles
import {
  Container,
  Title,
  Search,
  NavLinkStyled,
  LeftContainer,
  RightContainer,
} from "./styles";

declare interface SearchBarProps {
  onChangeSearch: (e: string) => void;
  className?: string;
}

const SearchBar = ({ className, onChangeSearch }: SearchBarProps) => {
  const media = useMedia();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const title = useMemo(() => {
    return media != "mobile" && <Title>{"Github"}</Title>;
  }, [media]);

  const menuIcon = useMemo(() => {
    return (
      media === "mobile" && (
        <div onClick={() => setIsOpenDrawer(!isOpenDrawer)}>
          <Menu color="secondary" />
        </div>
      )
    );
  }, [media, isOpenDrawer]);

  const rightContainer = useMemo(() => {
    return (
      media != "mobile" && (
        <RightContainer>
          <NavLinkStyled to="/">
            <span>{"Users"}</span>
          </NavLinkStyled>
          <NavLinkStyled to="/repositories">
            <span>{"Repositories"}</span>
          </NavLinkStyled>
        </RightContainer>
      )
    );
  }, [media]);

  return (
    <Container className={className}>
      <LeftContainer>
        {title}
        {menuIcon}
        <Search
          color={"secondary"}
          startAdornment={<SearchIcon color="secondary" />}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChangeSearch(e.target.value)
          }
          media={media}
        />
      </LeftContainer>
      {rightContainer}
      <Drawer open={isOpenDrawer} close={() => setIsOpenDrawer(false)} />
    </Container>
  );
};

export default memo(SearchBar);
