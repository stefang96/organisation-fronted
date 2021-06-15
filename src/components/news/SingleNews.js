import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getNewsById } from "../../actions";
import moment from "moment";
import history from "../../history";

const SingleNews = (props) => {
  const { news, latestNews } = props;
  useEffect(() => {
    props.getNewsById(props.match.params.newsId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.match.params.newsId]);

  const getSingleView = (id) => {
    history.push("/news/" + id);
  };

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
                <div className="form-group mt-30">
                  <ul className="list-group ">
                    <li className="list-group-item active" aria-current="true">
                      Latest news
                    </li>

                    {latestNews &&
                      latestNews.map((news, i) => {
                        return (
                          <li key={i} className="list-group-item">
                            {" "}
                            <div onClick={() => getSingleView(news.id)}>
                              <b>{news.title}</b>{" "}
                            </div>
                            <p>{news.shortDescription}</p>
                          </li>
                        );
                      })}
                  </ul>
                </div>
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
    latestNews: state.news.latestNews,
  };
};

export default connect(mapStateToProps, { getNewsById })(SingleNews);
