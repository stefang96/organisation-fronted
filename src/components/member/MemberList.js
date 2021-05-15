import React, { useState, useEffect } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import { getMembers, clearMemerAction } from "../../actions/index";
import { connect } from "react-redux";
import moment from "moment";
import { Modal, Alert } from "react-bootstrap";
import history from "../../history";
import Archive from "./forms/Archive";
import Edit from "./forms/Edit";
import AddMember from "./forms/AddMember";
import getLoggedUser from "../../utils/getLoggedUser";

const MemberList = (props) => {
  const loggedUser = getLoggedUser();
  const [variant, setVariant] = useState(null);
  const [removeMemberModal, setRemoveMemberModal] = useState(false);
  const [editMemberModal, setEditMemberModal] = useState(false);
  const [createMemberModal, setCreateMemberModal] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [filters, setFilters] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    status: null,
  });

  const getInitialFilters = () => {
    let initialFilters = [];

    return initialFilters;
  };

  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
  }, []);

  useEffect(() => {
    checkResponseAction();
  }, [props.successAction, props.errorAction]);

  const statusCell = (props) => {
    const active = props.row.original.active;
    let status = "";
    console.log(props.row.original);
    if (active) {
      status = "Active";
    } else {
      status = "Inactive";
    }

    return (
      <div className="  ">
        <span
          className={`status  ${
            active ? "color-app-green " : "color-app-red"
          }   mr-10`}
        >
          •
        </span>

        {status}
      </div>
    );
  };

  const nameCell = (props) => {
    const firstName = props.row.original.firstName;
    const lastName = props.row.original.lastName;
    console.log(props.row.original);

    return (
      <div>
        {firstName} {lastName}
      </div>
    );
  };
  const organisationCell = (props) => {
    const name = props.row.original.organisation.name;
    if (!name) {
      return <div>-</div>;
    }

    return <div>{name}</div>;
  };
  const phoneCell = (props) => {
    const phone = props.row.original.phone;
    if (!phone) {
      return <div>-</div>;
    }

    return <div>{phone}</div>;
  };

  const actionCell = (props) => {
    const userId = props.row.original.id;

    console.log(props.singleView);
    if (!loggedUser) {
      return null;
    } else {
      return (
        <div className="d-flex">
          {loggedUser.role !== "member" && (
            <>
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="View"
                className="btn action-hover"
                onClick={() => viewMember(userId)}
              >
                <i className="bi bi-eye-fill color-app-green  "></i>
              </button>

              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Edit"
                className=" btn action-hover"
                onClick={() => setMemberIdEdit(userId)}
              >
                <i className="bi bi-pencil-square color-app-blue  "></i>
              </button>
              <button
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Remove"
                className="btn action-hover"
                onClick={() => setMemberIdRemove(userId)}
              >
                <i className="bi bi-person-x-fill color-app-red  "></i>
              </button>
            </>
          )}
        </div>
      );
    }
  };

  const dateCell = ({ value }) => {
    console.log(value);
    if (!value) {
      return <div>-</div>;
    }

    return <div>{moment.unix(value).format("MMMM Do YYYY")}</div>;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: nameCell,
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
        Cell: phoneCell,
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Organisation",
        accessor: "organisationName",
        Cell: organisationCell,
      },
      {
        Header: "Status",
        accessor: "active",
        Cell: statusCell,
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: dateCell,
      },
      {
        Header: "",
        accessor: "action",
        Cell: actionCell,
      },
    ],
    []
  );

  //Fetch data into list, based on current page, search query or selected filters
  const fetchData = React.useCallback(
    ({ pageIndex, pageSize, searchQuery, searchFilters }) => {
      window.scrollTo(0, 0);
      const pagination = {
        page: pageIndex + 1,
      };
      const filters = {
        search: searchQuery,
        status: searchFilters.status,
      };

      let reqData = {
        pagination: pagination,
        filters: filters,
      };
      if (props.singleView) {
        reqData = {
          pagination: pagination,
          filters: filters,
          organisationId: props.organisationId && props.organisationId,
        };
      }

      props.getMembers(reqData);
    },
    []
  );

  let data = [];
  const meta = props.memberMeta;
  if (props.memberList) {
    data = props.memberList;
    console.log(Math.ceil(meta.total / meta.limit));
  }

  const checkResponseAction = () => {
    if (props.successAction) {
      setTimeout(() => props.clearMemerAction(), 5000);
      setVariant("success");
    } else if (props.errorAction) {
      setTimeout(() => props.clearMemerAction(), 5000);
      setVariant("danger");
    }
  };

  const setShow = (value) => {
    if (!value) {
      props.clearMemerAction();
    }
  };

  const viewMember = (memberId) => {
    history.push("/members/" + memberId);
  };

  const createMember = () => {
    setCreateMemberModal(!createMemberModal);
  };
  const removeMember = () => {
    setRemoveMemberModal(!removeMemberModal);
  };

  const editMember = () => {
    setEditMemberModal(!editMemberModal);
  };

  const setMemberIdRemove = (memberId) => {
    setRemoveMemberModal(!removeMemberModal);
    setMemberId(memberId);
  };
  const setMemberIdEdit = (memberId) => {
    setEditMemberModal(!editMemberModal);
    setMemberId(memberId);
  };

  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={createMemberModal}
        onHide={createMember}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <AddMember changeModal={createMember} />
      </Modal>
      <Modal show={removeMemberModal} onHide={removeMember}>
        <Archive memberId={memberId} changeModal={removeMember} />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={editMemberModal}
        onHide={editMember}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Edit memberId={memberId} changeModal={editMember} />
      </Modal>

      <div className={`${props.singleView ? "" : "container-body"}  `}>
        <div className="table-view">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="d-flex">
                <div>
                  <h2>
                    Member <b>Management</b>
                  </h2>
                </div>
                {loggedUser && loggedUser.role === "admin" ? (
                  <div className="magin-auto mr-10">
                    <button
                      onClick={() => createMember()}
                      className="btn btn-primary d-flex align-items-center"
                    >
                      <i className="bi bi-plus-circle-fill"></i>
                      Add New User
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <DataTable
              fetchData={fetchData}
              filterName="All states"
              fetchFilters={fetchFilters}
              initialFilters={getInitialFilters}
              searchFilters={searchFilters}
              data={data}
              columns={columns}
              pageCount={meta && Math.ceil(meta.total / meta.limit)}
            />
          </div>
        </div>
        {(props.successAction || props.errorAction) && (
          <div className="alert-position">
            <Alert variant={variant} onClose={() => setShow(false)} dismissible>
              {props.message && props.message}
            </Alert>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    memberList: state.member.memberList,
    member: state.member.member,
    memberMeta: state.member.memberMeta,
    successAction: state.member.successAction,
    errorAction: state.member.errorAction,
    message: state.member.message,
  };
};

export default connect(mapStateToProps, {
  getMembers,
  clearMemerAction,
})(MemberList);
