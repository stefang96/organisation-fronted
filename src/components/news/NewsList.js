import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataGrid from "../grid/index";
import { getNews } from "../../actions/index";
import "./news.scss";
import { Height } from "@material-ui/icons";
import { Modal, Alert } from "react-bootstrap";
import CreateNews from "./forms/CreateNews";
import EditNews from "./forms/EditNews";
import RemoveNews from "./forms/RemoveNews";

const NewsList = (props) => {
  const [filters, setFilters] = useState(null);
  const [pageIndex, setPageIndex] = useState(null);
  const [createNewsModal, setCreateNewsModal] = useState(false);
  const [editNewsModal, setEditNewsModal] = useState(false);
  const [removeNewsModal, setRemoveNewsModal] = useState(false);
  const [newsId, setNewsId] = useState(false);

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
      let reqData = {
        pagination: pagination,
        filters: null,
      };
      if (props.profile) {
        reqData = {
          pagination: pagination,
          filters: null,
          memberId: props.memberId,
        };
      }

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

  const createNews = () => {
    setCreateNewsModal(!createNewsModal);
  };
  const editNews = (newsId = null) => {
    setEditNewsModal(!editNewsModal);
    setNewsId(newsId);
  };

  const removeNews = (newsId = null) => {
    setRemoveNewsModal(!removeNewsModal);
    setNewsId(newsId);
  };
  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={createNewsModal}
        onHide={createNews}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <CreateNews changeModal={createNews} />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={editNewsModal}
        onHide={editNews}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <EditNews newsId={newsId} changeModal={editNews} />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={removeNewsModal}
        onHide={removeNews}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <RemoveNews newsId={newsId} changeModal={removeNews} />
      </Modal>
      <div
        className={` ${!props.profile ? "container-body" : "mt-30"}   d-flex `}
      >
        <DataGrid
          data={data}
          meta={meta}
          columns={columns}
          fetchData={fetchData}
          fetchFilters={fetchFilters}
          createNews={createNews}
          removeNews={removeNews}
          editNews={editNews}
          searchFilters={getInitialFilters}
          profile={props.profile}
          pageCount={meta && Math.ceil(meta.total / meta.limit)}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.newsList,
    newsMeta: state.news.newsMeta,
  };
};
export default connect(mapStateToProps, { getNews })(NewsList);
