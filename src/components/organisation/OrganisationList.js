import React, { useEffect, useState } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import { getOrganisations } from "../../actions/index";
import { connect } from "react-redux";
import { fromJS } from "immutable";
import moment from "moment";
import { Modal, Button, closeButton } from "react-bootstrap";

const OrganisationList = (props) => {
  const [contactPersonModal, setContactPersonModal] = useState(false);
  const cotactPersonCell = (props) => {
    const contactPerson = props.row.original.contactPerson;
    console.log(props.row.original);
    if (!contactPerson) {
      return <div>-</div>;
    }

    return (
      <div onClick={() => changeModal()} className="contact-person">
        {contactPerson.firstName} {contactPerson.lastName}
      </div>
    );
  };
  const changeModal = () => {
    setContactPersonModal(!contactPersonModal);
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
  console.log(data);
  console.log(meta);
  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={contactPersonModal}
        onHide={changeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={changeModal}>Close</Button>
        </Modal.Footer>
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

            {true && (
              <DataTable
                fetchData={fetchData}
                data={data}
                columns={columns}
                pageCount={meta && Math.ceil(meta.total / meta.limit)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    organisationList: state.organisation.organisationList,
    organisationMeta: state.organisation.organisationMeta,
  };
};
export default connect(mapStateToProps, { getOrganisations })(OrganisationList);
