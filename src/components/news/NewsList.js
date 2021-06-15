import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import DataGrid from "../grid/index";
import {
  getNews,
  clearNewsAction,
  getMembers,
  getOrganisations,
  getLatestNews,
} from "../../actions/index";
import "./news.scss";
import { Modal, Alert } from "react-bootstrap";
import CreateNews from "./forms/CreateNews";
import EditNews from "./forms/EditNews";
import RemoveNews from "./forms/RemoveNews";
import getLoggedUser from "../../utils/getLoggedUser";

const NewsList = (props) => {
  const [filters, setFilters] = useState(null);
  const [createNewsModal, setCreateNewsModal] = useState(false);
  const [editNewsModal, setEditNewsModal] = useState(false);
  const [removeNewsModal, setRemoveNewsModal] = useState(false);
  const [newsId, setNewsId] = useState(false);
  const [variant, setVariant] = useState(null);
  const loggedUser = getLoggedUser();

  useEffect(() => {
    let dataLatest = {
      memberId: props.memberId,
    };
    checkResponseAction();
    props.getLatestNews(dataLatest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.successAction, props.errorAction]);

  useEffect(() => {
    props.getMembers();
    props.getOrganisations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let meta;
  const [searchFilters] = useState({
    organisationId: null,
    memberId: null,
  });

  let membersList = [
    {
      id: 0,
      title: "All members",
      value: "null",
    },
  ];

  let organisationsList = [
    {
      id: 0,
      title: "All organisations",
      value: "null",
    },
  ];
  props.membersList &&
    props.membersList.map((member, i) => {
      i = i + 1;
      return membersList.push({
        id: i,
        title: member.firstName + " " + member.lastName,
        value: member.id,
      });
    });

  props.organisationsList &&
    props.organisationsList.map((organisation, i) => {
      i = i + 1;
      return organisationsList.push({
        id: i,
        title: organisation.name,
        value: organisation.id,
      });
    });

  let initialFilters = [
    {
      title: "All members",
      searchName: "memberId",
      list: membersList,
    },
  ];

  if (!loggedUser) {
    initialFilters.push({
      title: "All organisations",
      searchName: "organisationId",
      list: organisationsList,
    });
  }
  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
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
        memberId: searchFilters.memberId,
      };
      let reqData = {
        pagination: pagination,
        filters: filters,
      };
      if (props.profile) {
        reqData = {
          pagination: pagination,
          filters: filters,
          memberId: props.memberId,
        };
      }

      props.getNews(reqData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const checkResponseAction = () => {
    if (props.successAction) {
      setTimeout(() => props.clearNewsAction(), 5000);
      setVariant("success");
    } else if (props.errorAction) {
      setTimeout(() => props.clearNewsAction(), 5000);
      setVariant("danger");
    }
  };

  const setShow = (value) => {
    if (!value) {
      props.clearNewsAction();
    }
  };

  const createNews = () => {
    setCreateNewsModal(!createNewsModal);
  };
  const editNews = (newsId = null) => {
    setEditNewsModal(!editNewsModal);
    if (newsId) setNewsId(newsId);
  };

  const removeNews = (newsId = null) => {
    setRemoveNewsModal(!removeNewsModal);
    if (newsId) setNewsId(newsId);
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
        <CreateNews
          memberId={props.memberId ? props.memberId : null}
          profile={props.profile}
          changeModal={createNews}
        />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={editNewsModal}
        onHide={editNews}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <EditNews
          profile={props.profile}
          memberId={props.memberId ? props.memberId : null}
          newsId={newsId}
          changeModal={editNews}
        />
      </Modal>
      <Modal keyboard={false} show={removeNewsModal} onHide={removeNews}>
        <RemoveNews
          profile={props.profile}
          memberId={props.memberId ? props.memberId : null}
          newsId={newsId}
          changeModal={removeNews}
        />
      </Modal>
      <div
        className={` ${!props.profile ? "container-body" : "mt-30"}   d-flex `}
      >
        <DataGrid
          data={data}
          meta={meta}
          latestNews={props.latestNews}
          isMyPofile={props.isMyPofile}
          columns={columns}
          fetchData={fetchData}
          fetchFilters={fetchFilters}
          createNews={createNews}
          removeNews={removeNews}
          editNews={editNews}
          initialFilters={!filters ? initialFilters : filters}
          searchFilters={searchFilters}
          profile={props.profile}
          pageCount={meta && Math.ceil(meta.total / meta.limit)}
        />
      </div>

      {(props.successAction || props.errorAction) && (
        <div className="alert-position">
          <Alert variant={variant} onClose={() => setShow(false)} dismissible>
            {props.message && props.message}
          </Alert>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.newsList,
    latestNews: state.news.latestNews,
    newsMeta: state.news.newsMeta,
    successAction: state.news.successAction,
    errorAction: state.news.errorAction,
    message: state.news.message,
    organisationsList: state.organisation.organisationList,
    membersList: state.member.memberList,
  };
};
export default connect(mapStateToProps, {
  getNews,
  clearNewsAction,
  getMembers,
  getLatestNews,
  getOrganisations,
})(NewsList);
