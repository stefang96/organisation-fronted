import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import MemberList from "../member/MemberList";

import { connect } from "react-redux";
import { getOrganisationById } from "../../actions/index";
import OrganisationInformation from "./OrganisationInformation";

const SingleOrganisation = (props) => {
  const [key, setKey] = useState("info");

  useEffect(() => {
    props.getOrganisationById(props.match.params.organisationId);
  }, [props.match.params.organisationId]);

  return (
    <div className="container-body ">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="info" title="Information">
          <OrganisationInformation
            organisationId={props.match.params.organisationId}
          />
        </Tab>
        <Tab eventKey="members" title="Members">
          <MemberList
            singleView={true}
            organisationId={props.match.params.organisationId}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default connect(null, { getOrganisationById })(SingleOrganisation);
