import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNewsById } from "../../actions";

import moment from "moment";
const SingleNews = (props) => {
  const { news } = props;
  useEffect(() => {
    props.getNewsById(props.match.params.newsId);
  }, [props.match.params.newsId]);

  return (
    news && (
      <div className="container-body ">
        <div className="px-20p">
          <h1>{news.title}</h1>
          <div className="card mb-3">
            <img
              src={
                news.filePath
                  ? news.filePath
                  : "http://localhost:5000/static/defaultNews.png"
              }
              className="card-img-top h-500"
              alt="..."
            />
            <div className="card-body d-flex">
              <div className="left">
                <ul className="list-group group-scroll">
                  <li className="list-group-item active" aria-current="true">
                    Latest news
                  </li>

                  <li className="list-group-item">
                    {" "}
                    <h5>
                      <b>A third item</b>{" "}
                    </h5>
                    <div>
                      A third itemA third itemA third itemA third itemA third
                      item
                    </div>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <h5>
                      <b>A third item</b>{" "}
                    </h5>
                    <div>
                      A third itemA third itemA third itemA third itemA third
                      item
                    </div>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <h5>
                      <b>A third item</b>{" "}
                    </h5>
                    <div>
                      A third itemA third itemA third itemA third itemA third
                      item
                    </div>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <h5>
                      <b>A third item</b>{" "}
                    </h5>
                    <div>
                      A third itemA third itemA third itemA third itemA third
                      item
                    </div>
                  </li>
                </ul>
              </div>
              <div className="right">
                <h7>
                  author: {news.member.firstName + " " + news.member.lastName} |
                  organisation: {news.member.organisation.name} <br /> date:
                  {moment.unix(news.createdAt).format("MMMM Do YYYY")}
                </h7>
                <hr></hr>
                <h3 className="mb-40">{news.shortDescription}</h3>
                <p className="card-text">{news.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    news: state.news.news,
  };
};

export default connect(mapStateToProps, { getNewsById })(SingleNews);
