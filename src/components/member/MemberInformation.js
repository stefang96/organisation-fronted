import React, { useEffect } from "react";
import { connect } from "react-redux";

const MemberInformation = (props) => {
  const organisation = props.member.organisation && props.member.organisation;
  useEffect(() => {}, []);

  console.log(props.member);
  return (
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
            <div className="magin-auto mr-10">
              <button class="btn btn-primary d-flex align-items-center">
                <i class="bi bi-plus-circle-fill"></i>
                Edit
              </button>
            </div>
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
              <div className="my-profile--header">Organisation information</div>
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
  );
};

const mapStateToProps = (state) => {
  return {
    member: state.member.member,
  };
};
export default connect(mapStateToProps)(MemberInformation);
