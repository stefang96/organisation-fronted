import React, { useEffect } from "react";
import DataTable from "../table/DataTable";
import "../table/table.scss";
import { getNews } from "../../actions/index";
import { connect } from "react-redux";
import { fromJS } from "immutable";

const OrganisationList = (props) => {
  let data;
  let meta;

  useEffect(() => {
    props.getNews();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
      },
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Description",
        accessor: "description",
      },
    ],
    []
  );

  data = props.news;
  console.log(data);

  return (
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

          {data && <DataTable data={data} columns={columns} />}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.newsList,
    newsMeta: state.news.newsMeta,
  };
};
export default connect(mapStateToProps, { getNews })(OrganisationList);
