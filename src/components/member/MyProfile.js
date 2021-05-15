import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import NewsList from "../news/NewsList";
import MemberInformation from "./MemberInformation";
import PaymentsList from "../payments/PaymentsList";
import { connect } from "react-redux";
import { getMemberById } from "../../actions/index";
import getLoggedUser from "../../utils/getLoggedUser";
import history from "../../history";

const MyProfile = (props) => {
  const loggedUser = getLoggedUser();

  const isMyPofile = history.location.pathname.includes("my-profile");
  console.log(isMyPofile);
  const [key, setKey] = useState("info");
  useEffect(() => {
    props.getMemberById(props.match.params.memberId);
  }, [props.match.params.memberId]);

  return (
    <div className="container-body ">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="info" title="Information">
          <MemberInformation memberId={props.match.params.memberId} />
        </Tab>
        <Tab eventKey="news" title="News">
          <NewsList
            isMyPofile={!isMyPofile}
            profile={true}
            memberId={props.match.params.memberId}
          />
        </Tab>
        {(!isMyPofile || loggedUser.role === "member") && (
          <Tab eventKey="payments" title="Payments">
            <PaymentsList
              profile={true}
              memberId={props.match.params.memberId}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

export default connect(null, { getMemberById })(MyProfile);
