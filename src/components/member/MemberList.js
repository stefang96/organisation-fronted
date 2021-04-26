import React, { useState, useEffect } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import {
  getMembers,
  clearMemerAction,
  getMemberById,
} from "../../actions/index";
import { connect } from "react-redux";
import { fromJS } from "immutable";
import moment from "moment";
import { Modal, Alert } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import history from "../../history";

import Archive from "./forms/Archive";
import Edit from "./forms/Edit";

const MemberList = (props) => {
  const [contactPersonModal, setContactPersonModal] = useState(false);
  const [contactPersonId, setContactPersonId] = useState(null);
  const [variant, setVariant] = useState(null);
  const [archiveMemberModal, setArchiveMemberModal] = useState(false);
  const [editMemberModal, setEditMemberModal] = useState(false);
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    checkResponseAction();
  }, [props.successAction, props.errorAction]);

  const archiveMember = (memberId) => {
    setArchiveMemberModal(!archiveMemberModal);
    setMemberId(memberId);
  };

  const editMember = (memberId) => {
    setEditMemberModal(!editMemberModal);
    setMemberId(memberId);
  };

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
          class={`status  ${
            active ? "color-app-green " : "color-app-red"
          } text-success mr-10`}
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
    console.log(props.row.original);

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

    return (
      <div className="d-flex">
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="View"
          class="btn action-hover"
          onClick={() => viewMember(userId)}
        >
          <i className="bi bi-eye-fill color-app-green  "></i>
        </button>

        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edit"
          className=" btn action-hover"
          onClick={() => editMember(userId)}
        >
          <i className="bi bi-pencil-square color-app-blue  "></i>
        </button>
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Remove"
          className="btn action-hover"
          onClick={() => archiveMember(userId)}
        >
          <i className="bi bi-person-x-fill color-app-red  "></i>
        </button>
      </div>
    );
  };
  const changeModal = (contactPersonId = null) => {
    setContactPersonModal(!contactPersonModal);
    setContactPersonId(contactPersonId);
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
      };
      const reqData = {
        pagination: pagination,
        filters: filters,
      };
      console.log(pageIndex);

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
      changeModal();
      setTimeout(() => props.clearMemerAction(), 5000);
      setVariant("success");
    } else if (props.errorAction) {
      changeModal();
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
    history.push("members/" + memberId);
  };

  return (
    <>
      <Modal show={archiveMemberModal} onHide={archiveMember}>
        <Archive memberId={memberId} changeModal={archiveMember} />
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

      <div className="container-body ">
        <div class="table-view">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="d-flex">
                <div>
                  <h2>
                    Member <b>Management</b>
                  </h2>
                </div>
                <div className="magin-auto mr-10">
                  <button class="btn btn-primary d-flex align-items-center">
                    <i class="bi bi-plus-circle-fill"></i>
                    Add New User
                  </button>
                </div>
              </div>
            </div>

            <DataTable
              fetchData={fetchData}
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
