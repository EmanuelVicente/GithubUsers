import React, { memo, useState, useMemo, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useLazyQuery } from "@apollo/client";

//Components
import SearchBar from "./../../components/SearchBar/SearchBar";
import Table from "./../../components/Table/Table";

//Types
import { AlignEnum } from "./../../components/Table/types";

//Graphql
import {
  SearchQueryUsersProps,
  SearchQueryUsersNodeProps,
  searchQueryUsers,
} from "../../graphql/query";

//Styles
import { TitleStyled, Container } from "./styles";

const UserSearch = () => {
  const [result, setResult] = useState<string>("");
  const [resultDebounce, setResultDebounce] = useState<string>("");
  const [paginatedData, setPaginatedData] = useState<SearchQueryUsersProps>({
    search: { nodes: [] },
  });

  const [getUsers, { data }] =
    useLazyQuery<SearchQueryUsersProps>(searchQueryUsers);

  useEffect(() => {
    if (!data) {
      return;
    }
    if (data && data.search.pageInfo?.hasPreviousPage) {
      setPaginatedData({
        search: {
          ...data?.search,
          nodes: [
            ...(paginatedData.search?.nodes || []),
            ...(data?.search?.nodes || []).filter(
              (value) =>
                !(paginatedData.search?.nodes || []).some(
                  (valuePaginated) =>
                    value.id === valuePaginated.id || !valuePaginated.id
                )
            ),
          ],
        },
      });
    } else {
      setPaginatedData(
        data || {
          search: { nodes: [] },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.search]);

  useEffect(() => {
    debounce(() => setResultDebounce(result), 500)();
  }, [result, resultDebounce]);

  useEffect(() => {
    getUsers({
      variables: {
        query: resultDebounce,
        type: "USER",
        first: 20,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDebounce, getUsers]);

  const parsedData = useMemo(
    () =>
      paginatedData?.search?.nodes?.map((node: SearchQueryUsersNodeProps) => {
        return {
          id: node.id,
          data:
            [
              {
                value: node.name,
                align: AlignEnum.left,
              },
              {
                value: node.email,
                align: AlignEnum.left,
              },
              {
                value: node.location,
                align: AlignEnum.left,
              },
              {
                value: node.url,
                align: AlignEnum.left,
              },
            ] || [],
        };
      }) || [],
    [paginatedData?.search?.nodes]
  );
  const fetchUsers = useCallback(() => {
    getUsers({
      variables: {
        query: resultDebounce,
        type: "USER",
        after: paginatedData?.search?.pageInfo?.endCursor,
        first: 20,
      },
    });
  }, [getUsers, paginatedData?.search?.pageInfo?.endCursor, resultDebounce]);

  return (
    <>
      <SearchBar onChangeSearch={setResult} />
      <Container>
        <TitleStyled text="Users" />
        <Table
          header={[
            {
              value: "Name",
              align: AlignEnum.left,
            },
            {
              value: "Email",
              align: AlignEnum.left,
            },
            {
              value: "Location",
              align: AlignEnum.left,
            },
            {
              value: "Url",
              align: AlignEnum.left,
            },
          ]}
          data={parsedData}
          nextPage={fetchUsers}
          hasMore={paginatedData?.search?.pageInfo?.hasNextPage || false}
        />
      </Container>
    </>
  );
};

export default memo(UserSearch);
