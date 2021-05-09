import React, { useState, useEffect } from "react";
import loggedUser from "../../utils/getLoggedUser";
import RemoveOrganisation from "./forms/RemoveOrganisation";
import { Modal, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import EditOrganisation from "./forms/EditOrganisation";

const OrganisationInformation = (props) => {
  const user = loggedUser();
  const organisation = props.organisation && props.organisation;
  const conactPerson =
    props.organisation.contactPerson && props.organisation.contactPerson;
  const [removeOrganisationModal, setRemoveOrganisationModal] = useState(false);
  const [editOrganisationModal, setEditOrganisationModal] = useState(false);

  useEffect(() => {}, [props.organisation]);

  const removeOrganisation = () => {
    setRemoveOrganisationModal(!removeOrganisationModal);
  };

  const editOrganisation = () => {
    setEditOrganisationModal(!editOrganisationModal);
  };

  const renderActionsButton = () => {
    if (user.role === "super_admin")
      return (
        <>
          <button
            onClick={() => removeOrganisation()}
            class="btn btn-primary d-flex align-items-center"
          >
            <i class="bi bi-person-x-fill color-app-red"></i>
            Remove organisation
          </button>
          <button
            onClick={() => editOrganisation()}
            class="btn btn-primary d-flex align-items-center"
          >
            <i class="bi bi-pencil-square"></i>
            Edit organisation
          </button>
        </>
      );
  };
  return (
    <>
      <Modal show={removeOrganisationModal} onHide={removeOrganisation}>
        <RemoveOrganisation
          organisationId={props.organisationId}
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
          organisationId={props.organisationId}
          changeModal={editOrganisation}
        />
      </Modal>

      <div class="table-view">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="d-flex">
              <div>
                <h2>
                  <b>{props.organisation.name}</b> Information
                </h2>
              </div>
              <div className="magin-auto mr-10">{renderActionsButton()}</div>
            </div>
          </div>
          <div className="d-flex">
            {organisation && (
              <div className="flex-50 mr-30">
                <div className="my-profile--header">
                  Organisation information
                </div>
                <div class="card mb-3  ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {organisation.name}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Type</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {organisation.type}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Number Of Employees</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {organisation.numberOfEmployees}
                      </div>
                    </div>
                    <hr />

                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Address</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        Bay Area, San Francisco, CA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {conactPerson && (
              <div className="flex-50  ">
                <div className="my-profile--header">
                  Contact Person information
                </div>
                <div class="card mb-3    ">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Full Name</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {conactPerson.firstName} {conactPerson.lastName}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Email</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {conactPerson.email}{" "}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Phone</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {conactPerson.phone ? conactPerson.phone : "--"}{" "}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Role</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        {conactPerson.role}
                      </div>
                    </div>
                    <hr />
                    <div class="row">
                      <div class="col-sm-3">
                        <h6 class="mb-0">Address</h6>
                      </div>
                      <div class="col-sm-9 text-secondary">
                        {" "}
                        Bay Area, San Francisco, CA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    organisation: state.organisation.organisation,
  };
};

export default connect(mapStateToProps)(OrganisationInformation);
