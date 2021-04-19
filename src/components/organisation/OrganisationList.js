import React, { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import { getOrganisations, clearMemerAction } from "../../actions/index";
import { connect } from "react-redux";
import { fromJS } from "immutable";
import moment from "moment";
import { Modal, Alert } from "react-bootstrap";
import { reduxForm, Field } from "redux-form";
import renderTextField from "../fields/renderTextField ";
import ContactPersonForm from "./forms/ContactPersonForm";

const OrganisationList = (props) => {
  const [contactPersonModal, setContactPersonModal] = useState(false);
  const [contactPersonId, setContactPersonId] = useState(null);
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    checkResponseAction();
  }, [props.successAction, props.errorAction]);

  const cotactPersonCell = (props) => {
    const contactPerson = props.row.original.contactPerson;
    console.log(props.row.original);
    if (!contactPerson) {
      return <div>-</div>;
    }

    return (
      <div
        onClick={() => changeModal(contactPerson.id)}
        className="contact-person"
      >
        {contactPerson.firstName} {contactPerson.lastName}
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
      },
      {
        Header: "Contact person",
        accessor: "contactPerson",
        Cell: cotactPersonCell,
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: dateCell,
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

      props.getOrganisations(reqData);
    },
    []
  );

  let data = [];
  const meta = props.organisationMeta;
  if (props.organisationList) {
    data = props.organisationList;
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
  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={contactPersonModal}
        onHide={changeModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ContactPersonForm
          memberId={contactPersonId}
          changeModal={changeModal}
        />
      </Modal>
      <div className="container-body ">
        <div class="table-view">
          <div class="table-wrapper">
            <div class="table-title">
              <div class="d-flex">
                <div>
                  <h2>
                    Organisation <b>Management</b>
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

            {
              <DataTable
                fetchData={fetchData}
                data={data}
                columns={columns}
                pageCount={meta && Math.ceil(meta.total / meta.limit)}
              />
            }
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
    organisationList: state.organisation.organisationList,
    organisationMeta: state.organisation.organisationMeta,
    successAction: state.member.successAction,
    errorAction: state.member.errorAction,
    message: state.member.message,
  };
};
export default connect(mapStateToProps, { getOrganisations, clearMemerAction })(
  OrganisationList
);
