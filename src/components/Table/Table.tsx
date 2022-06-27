import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as TableMaterial,
} from "@mui/material";

import { CircularProgressStyled, Container } from "./styles";

import { TableProps, Data } from "./types";

const Table = ({ className, header, data, nextPage, hasMore }: TableProps) => {
  return (
    <Container className={className}>
      <InfiniteScroll
        dataLength={data.length}
        next={nextPage}
        hasMore={hasMore}
        loader={<CircularProgressStyled color="primary" size={30} />}
      >
        <TableContainer style={{ width: "100%" }} component={Paper}>
          <TableMaterial>
            <TableHead>
              <TableRow>
                {header.map((hd: Data) => (
                  <TableCell key={`${uuidv4()}`} align={hd.align}>
                    {hd.value}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  {row.data.map((r: Data) => (
                    <TableCell key={`${uuidv4()}`} align={r.align}>
                      {r.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </TableMaterial>
        </TableContainer>
      </InfiniteScroll>
    </Container>
  );
};

export default memo(Table);
