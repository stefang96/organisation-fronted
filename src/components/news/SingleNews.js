import React from "react";

const SingleNews = () => {
  return (
    <div className="container-body    ">
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
              <ul class="list-group">
                <li class="list-group-item active" aria-current="true">
                  An active item
                </li>
                <li class="list-group-item">A second item</li>
                <li class="list-group-item">A third item</li>
                <li class="list-group-item">A fourth item</li>
                <li class="list-group-item">And a fifth one</li>
              </ul>
            </div>

            <div className="right">
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
