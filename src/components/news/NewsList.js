import React, { useState, useEffect } from "react";
import DataGrid from "../grid/index";

const NewsList = () => {
  const [filters, setFilters] = useState();
  const [searchFilters, setSearchFilters] = useState({
    searchOrganisation: "",
    searchMember: "",
  });
  const data = [
    {
      name: "Name",
    },
    {
      name: "Name 1",
    },
    {
      name: "Name 2",
    },
    {
      name: "Name 3",
    },
    {
      name: "Name 4",
    },
  ];

  const getInitialFilters = () => {
    let initialFilters = [];

    return initialFilters;
  };
  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
  }, []);

  const fetchData = React.useCallback(
    ({ pageIndex, pageSize, searchQuery, limit, searchFilters }) => {
      window.scrollTo(0, 0);
      /* props.getProjects(
        pageIndex + 1,
        pageSize,
        limit,
        searchQuery,
        searchFilters
      );
      setMessage("No projects found."); */
    },
    []
  );
  return (
    <div className="d-flex news">
      <DataGrid
        data={data}
        fetchData={fetchData}
        searchFilters={searchFilters}
        fetchFilters={fetchFilters}
        initialFilters={!filters ? getInitialFilters() : filters}
      />
    </div>
  );
};

export default NewsList;
