import React from "react";

const MemberList = () => {
  return (
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
        </div>
      </div>
    </div>
  );
};

export default MemberList;
