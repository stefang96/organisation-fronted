import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataGrid from "../grid/index";
import { getNews } from "../../actions/index";
import "./news.scss";
import { Height } from "@material-ui/icons";

const NewsList = (props) => {
  const [filters, setFilters] = useState(null);
  const [pageIndex, setPageIndex] = useState(null);

  let meta;
  const [searchFilters, setSearchFilters] = useState({
    organisationId: null,
  });

  const getInitialFilters = () => {
    let initialFilters = [];

    return initialFilters;
  };
  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
  }, []);

  const fetchPage = React.useCallback(({ pageIndex }) => {
    setPageIndex(pageIndex);
  }, []);

  let data = [];
  if (props.news) {
    data = props.news;
    meta = props.newsMeta;
  }

  const fetchData = React.useCallback(
    ({ pageIndex, searchQuery, searchFilters }) => {
      const pagination = {
        page: pageIndex + 1,
      };
      const filters = {
        search: searchQuery,
        organisationId: searchFilters.organisationId,
      };
      const reqData = {
        pagination: pagination,
        filters: null,
      };
      props.getNews(reqData);
    },
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );
  return (
    <div className="container-body  d-flex ">
      <DataGrid
        data={data}
        meta={meta}
        columns={columns}
        fetchData={fetchData}
        fetchFilters={fetchFilters}
        searchFilters={getInitialFilters}
        pageCount={meta && Math.ceil(meta.total / meta.limit)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.newsList,
    newsMeta: state.news.newsMeta,
  };
};
export default connect(mapStateToProps, { getNews })(NewsList);
