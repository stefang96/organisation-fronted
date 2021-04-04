import React from "react";

const SingleNews = () => {
  return (
    <div className="container-body    ">
      <div className="px-20p">
        <div class="card mb-3">
          <img
            src={"http://localhost:5000/static/defaultNews.png"}
            class="card-img-top h-500"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
            <p class="card-text">
              <small class="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
