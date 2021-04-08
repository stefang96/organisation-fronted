import React from "react";

const SingleNews = () => {
  return (
    <div className="container-body ">
      <div className="px-20p">
        <h1>Card title</h1>
        <div class="card mb-3">
          <img
            src={"http://localhost:5000/static/defaultNews.png"}
            class="card-img-top h-500"
            alt="..."
          />
          <div class="card-body d-flex">
            <div className="left">
              <ul class="list-group group-scroll">
                <li class="list-group-item active" aria-current="true">
                  Latest news
                </li>

                <li class="list-group-item">
                  {" "}
                  <h5>
                    <b>A third item</b>{" "}
                  </h5>
                  <div>
                    A third itemA third itemA third itemA third itemA third item
                  </div>
                </li>
                <li class="list-group-item">
                  {" "}
                  <h5>
                    <b>A third item</b>{" "}
                  </h5>
                  <div>
                    A third itemA third itemA third itemA third itemA third item
                  </div>
                </li>
                <li class="list-group-item">
                  {" "}
                  <h5>
                    <b>A third item</b>{" "}
                  </h5>
                  <div>
                    A third itemA third itemA third itemA third itemA third item
                  </div>
                </li>
                <li class="list-group-item">
                  {" "}
                  <h5>
                    <b>A third item</b>{" "}
                  </h5>
                  <div>
                    A third itemA third itemA third itemA third itemA third item
                  </div>
                </li>
              </ul>
            </div>
            <div className="right">
              <h7>
                author: Stefan Grujicic | organisation : Organisation 1 | Date:
                12 Jun 2019
              </h7>
              <hr></hr>
              <h3 className="mb-40">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </h3>
              <p class="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer. This is a wider card with supporting text below as a
                natural lead-in to additional content. This content is a little
                bit longer. This is a wider card with supporting text below as a
                natural lead-in to additional content. This content is a little
                bit longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNews;
