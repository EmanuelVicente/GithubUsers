import React, { memo } from "react";

import { Container, TitleStyled } from "./styles";

declare interface TitleProps {
  className?: string;
  text: string;
}

const Title = ({ className, text }: TitleProps) => (
  <Container className={className}>
    <TitleStyled>{text}</TitleStyled>
  </Container>
);

export default memo(Title);
