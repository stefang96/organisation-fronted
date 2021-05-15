import React, { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import { getOrganisations, clearMemerAction } from "../../actions/index";
import { connect } from "react-redux";
import moment from "moment";
import { Modal, Alert } from "react-bootstrap";
import loggedUser from "../../utils/getLoggedUser";
import ContactPersonForm from "./forms/ContactPersonForm";
import history from "../../history";
import AddOrganisation from "./forms/AddOrganisation";
import RemoveOrganisation from "./forms/RemoveOrganisation";
import EditOrganisation from "./forms/EditOrganisation";

const OrganisationList = (props) => {
  const user = loggedUser();
  const [contactPersonModal, setContactPersonModal] = useState(false);
  const [contactPersonId, setContactPersonId] = useState(null);
  const [variant, setVariant] = useState(null);
  const [removeOrganisationModal, setRemoveOrganisationModal] = useState(false);
  const [editOrganisationModal, setEditOrganisationModal] = useState(false);
  const [createOrganisationModal, setCreateOrganisationModal] = useState(false);
  const [organisationId, setOrganisationId] = useState(null);
  const [filters, setFilters] = useState(null);
  const [searchFilters, setSearchFilters] = useState({
    memberId: null,
  });

  useEffect(() => {
    checkResponseAction();
  }, [props.successAction, props.errorAction]);

  const cotactPersonCell = (props) => {
    const contactPerson = props.row.original.contactPerson;

    if (!contactPerson) {
      return <div>-</div>;
    }

    return (
      <div
        onClick={() => setConactPersonId(contactPerson.id)}
        className="contact-person"
      >
        {contactPerson.firstName} {contactPerson.lastName}
      </div>
    );
  };

  const dateCell = ({ value }) => {
    console.log(value);
    if (!value) {
      return <div>-</div>;
    }

    return <div>{moment.unix(value).format("MMMM Do YYYY")}</div>;
  };

  const actionCell = (props) => {
    const organisationId = props.row.original.id;

    return (
      <div className="d-flex">
        <button
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="View"
          className="btn action-hover"
          onClick={() => viewOrganisation(organisationId)}
        >
          <i className="bi bi-eye-fill color-app-green  "></i>
        </button>
        {user && user.role === "super_admin" && (
          <>
            <button
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Edit"
              className=" btn action-hover"
              onClick={() => setOrganisationIdEdit(organisationId)}
            >
              <i className="bi bi-pencil-square color-app-blue  "></i>
            </button>
            <button
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Remove"
              className="btn action-hover"
              onClick={() => setOrgnisationIdRemove(organisationId)}
            >
              <i className="bi bi-person-x-fill color-app-red  "></i>
            </button>
          </>
        )}
      </div>
    );
  };

  const viewOrganisation = (memberId) => {
    history.push("/organisation/" + memberId);
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
        memberId: searchFilters.memberId,
      };
      const reqData = {
        pagination: pagination,
        filters: filters,
      };

      props.getOrganisations(reqData);
    },
    []
  );

  let data = [];
  const meta = props.organisationMeta;
  if (props.organisationList) {
    data = props.organisationList;
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

  const createOrganisation = () => {
    setCreateOrganisationModal(!createOrganisationModal);
  };
  const removeOrganisation = () => {
    setRemoveOrganisationModal(!removeOrganisationModal);
  };

  const editOrganisation = () => {
    setEditOrganisationModal(!editOrganisationModal);
  };

  const conactPersonEmail = () => {
    setContactPersonModal(!contactPersonModal);
  };
  const setConactPersonId = (contactPersonId) => {
    setContactPersonModal(!contactPersonModal);
    setContactPersonId(contactPersonId);
  };
  const setOrgnisationIdRemove = (organisationId) => {
    setRemoveOrganisationModal(!removeOrganisationModal);
    setOrganisationId(organisationId);
  };
  const setOrganisationIdEdit = (organisationId) => {
    setEditOrganisationModal(!editOrganisationModal);
    setOrganisationId(organisationId);
  };

  const getInitialFilters = () => {
    let initialFilters = [];

    return initialFilters;
  };

  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
  }, []);
  return (
    <>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={contactPersonModal}
        onHide={conactPersonEmail}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <ContactPersonForm
          memberId={contactPersonId}
          changeModal={conactPersonEmail}
        />
      </Modal>

      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={createOrganisationModal}
        onHide={createOrganisation}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <AddOrganisation changeModal={createOrganisation} />
      </Modal>
      <Modal show={removeOrganisationModal} onHide={removeOrganisation}>
        <RemoveOrganisation
          organisationId={organisationId}
          changeModal={removeOrganisation}
        />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={editOrganisationModal}
        onHide={editOrganisation}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <EditOrganisation
          organisationId={organisationId}
          changeModal={editOrganisation}
        />
      </Modal>

      <div className="container-body ">
        <div className="table-view">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="d-flex">
                <div>
                  <h2>
                    Organisation <b>Management</b>
                  </h2>
                </div>
                <div className="magin-auto mr-10">
                  <button
                    onClick={() => createOrganisation()}
                    className="btn btn-primary d-flex align-items-center"
                  >
                    <i className="bi bi-plus-circle-fill "></i>
                    Add New Organisation
                  </button>
                </div>
              </div>
            </div>

            {
              <DataTable
                fetchData={fetchData}
                fetchFilters={fetchFilters}
                initialFilters={getInitialFilters}
                searchFilters={searchFilters}
                filterName="All contact person"
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
    successAction: state.organisation.successAction,
    errorAction: state.organisation.errorAction,
    message: state.organisation.message,
  };
};
export default connect(mapStateToProps, { getOrganisations, clearMemerAction })(
  OrganisationList
);
