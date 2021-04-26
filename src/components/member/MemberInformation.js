import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Modal, Alert } from "react-bootstrap";
import Archive from "./forms/Archive";
import Edit from "./forms/Edit";
import loggedUser from "../../utils/getLoggedUser";

const MemberInformation = (props) => {
  const user = loggedUser();
  const organisation = props.member.organisation && props.member.organisation;
  const [archiveMemberModal, setArchiveMemberModal] = useState(false);
  const [editMemberModal, setEditMemberModal] = useState(false);
  useEffect(() => {}, [props.member]);

  const archiveMember = () => {
    setArchiveMemberModal(!archiveMemberModal);
  };

  const editMember = () => {
    setEditMemberModal(!editMemberModal);
  };

  const renderActionsButton = () => {
    if (user.role === "member" && props.member && user.id === props.member.id) {
      return (
        <>
          <button
            onClick={() => editMember()}
            class="btn btn-primary d-flex align-items-center"
          >
            <i class="bi bi-pencil-square"></i>
            Edit member
          </button>
        </>
      );
    } else if (
      (organisation &&
        user.role === "admin" &&
        user.organisation.id === organisation.id) ||
      user.role === "super_admin"
    ) {
      return (
        <>
          <button
            onClick={() => archiveMember()}
            class="btn btn-primary d-flex align-items-center"
          >
            <i class="bi bi-person-x-fill color-app-red"></i>
            Archive member
          </button>
          <button
            onClick={() => editMember()}
            class="btn btn-primary d-flex align-items-center"
          >
            <i class="bi bi-pencil-square"></i>
            Edit member
          </button>
        </>
      );
    }
  };

  return (
    <>
      <Modal show={archiveMemberModal} onHide={archiveMember}>
        <Archive memberId={props.memberId} changeModal={archiveMember} />
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={editMemberModal}
        onHide={editMember}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Edit memberId={props.memberId} changeModal={editMember} />
      </Modal>

      <div class="table-view">
        <div class="table-wrapper">
          <div class="table-title">
            <div class="d-flex">
              <div>
                <h2>
                  <b>
                    {props.member.firstName} {props.member.lastName}
                  </b>{" "}
                  Information
                </h2>
              </div>
              <div className="magin-auto mr-10">{renderActionsButton()}</div>
            </div>
          </div>
          <div className="d-flex">
            <div className="flex-50 mr-30">
              <div className="my-profile--header">Member information</div>
              <div class="card mb-3    ">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Full Name</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {" "}
                      {props.member.firstName} {props.member.lastName}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {" "}
                      {props.member.email}{" "}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Phone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {" "}
                      {props.member.phone ? props.member.phone : "--"}{" "}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Role</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {" "}
                      {props.member.role}
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
            {organisation && (
              <div className="flex-50">
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
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    member: state.member.member,
  };
};
export default connect(mapStateToProps)(MemberInformation);
