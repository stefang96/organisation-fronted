import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataGrid from "../grid/index";
import { getNews } from "../../actions/index";

const NewsList = (props) => {
  const [filters, setFilters] = useState(null);
  const [pageIndex, setPageIndex] = useState(null);
  let data;
  let meta;
  const [searchFilters, setSearchFilters] = useState({
    organisationId: null,
  });

  useEffect(() => {}, []);

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

  if (props.news) {
    data = props.news;
    meta = props.newsMeta;
  }

  const fetchData = React.useCallback(
    ({ pageIndex, searchQuery, searchFilters }) => {
      window.scrollTo(0, 0);
      const pagination = {
        page: pageIndex,
      };
      const filters = {
        search: searchQuery,
        organisationId: searchFilters.organisationId,
      };
      const reqData = {
        pagination: pagination,
        filters: filters,
      };
      props.getNews(reqData);
    },
    []
  );
  return (
    <div className="container-body d-flex news">
      <DataGrid
        data={data}
        meta={meta}
        pageIndex={pageIndex ? pageIndex : 1}
        fetchData={fetchData}
        fetchPage={fetchPage}
        searchFilters={searchFilters}
        fetchFilters={fetchFilters}
        initialFilters={!filters ? getInitialFilters() : filters}
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
