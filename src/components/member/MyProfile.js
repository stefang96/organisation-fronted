import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "react-bootstrap";
import NewsList from "../news/NewsList";
import MemberInformation from "./MemberInformation";
import { connect } from "react-redux";
import { getMemberById } from "../../actions/index";

const MyProfile = (props) => {
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
        <Tab eventKey="news" title="My news">
          <NewsList profile={true} memberId={props.match.params.memberId} />
        </Tab>
        <Tab eventKey="payments" title="Payments">
          <div className="mt-30">User payments</div>
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    member: state.member.member,
    news: state.member.member.news,
  };
};
export default connect(mapStateToProps, { getMemberById })(MyProfile);
