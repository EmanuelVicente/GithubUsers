import React, { memo, useState, useMemo, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useLazyQuery } from "@apollo/client";

//Graphql
import {
  SearchQueryRepositoryProps,
  SearchQueryRepositoryNodeProps,
  searchQueryRepository,
} from "../../graphql/query";

//Components
import SearchBar from "./../../components/SearchBar/SearchBar";
import Table from "./../../components/Table/Table";

//Types
import { AlignEnum } from "../../components/Table/types";

//Styles
import { TitleStyled, Container } from "./styles";

const RepositoriesSearch = () => {
  const [result, setResult] = useState<string>("");
  const [resultDebounce, setResultDebounce] = useState<string>("");
  const [paginatedData, setPaginatedData] =
    useState<SearchQueryRepositoryProps>({
      search: { nodes: [] },
    });

  const [getRepositories, { data }] = useLazyQuery<SearchQueryRepositoryProps>(
    searchQueryRepository
  );

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
    getRepositories({
      variables: {
        query: resultDebounce,
        type: "REPOSITORY",
        first: 20,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDebounce]);

  const parsedData = useMemo(
    () =>
      paginatedData?.search?.nodes?.map(
        (node: SearchQueryRepositoryNodeProps) => {
          const updateDate = new Date(node.updatedAt);
          const createdAt = new Date(node.createdAt);

          return {
            id: node.id,
            data:
              [
                {
                  value: node.name,
                  align: AlignEnum.left,
                },
                {
                  value: node.url,
                  align: AlignEnum.left,
                },
                {
                  value: node.description,
                  align: AlignEnum.left,
                },
                {
                  value: `${updateDate.getDate()}/${updateDate.getMonth()}/${updateDate.getFullYear()}`,
                  align: AlignEnum.center,
                },
                {
                  value: `${createdAt.getDate()}/${createdAt.getMonth()}/${createdAt.getFullYear()}`,
                  align: AlignEnum.center,
                },
              ] || [],
          };
        }
      ) || [],
    [paginatedData?.search?.nodes]
  );

  const fetchRepositories = useCallback(() => {
    getRepositories({
      variables: {
        query: resultDebounce,
        type: "REPOSITORY",
        after: paginatedData?.search?.pageInfo?.endCursor,
        first: 20,
      },
    });
  }, [
    getRepositories,
    paginatedData?.search?.pageInfo?.endCursor,
    resultDebounce,
  ]);

  return (
    <>
      <SearchBar onChangeSearch={setResult} />
      <Container>
        <TitleStyled text="Repositories" />
        <Table
          header={[
            {
              value: "Name",
              align: AlignEnum.left,
            },
            {
              value: "Url",
              align: AlignEnum.left,
            },
            {
              value: "Description",
              align: AlignEnum.left,
            },
            {
              value: "Updated",
              align: AlignEnum.left,
            },
            {
              value: "Created",
              align: AlignEnum.left,
            },
          ]}
          data={parsedData}
          nextPage={fetchRepositories}
          hasMore={paginatedData?.search?.pageInfo?.hasNextPage || false}
        />
      </Container>
    </>
  );
};

export default memo(RepositoriesSearch);
