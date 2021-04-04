import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import history from "../../history";

const DataGrid = (props) => {
  const { data, fetchData, searchFilters, meta, fetchPage } = props;
  // const { limit, page, total } = props.meta;
  console.log(meta);
  const filters = props.initialFilters;
  const [searchQuery, setSearchQuery] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);
  const pageArray = [];
  if (meta) {
    for (let i = 1; i <= Math.ceil(meta.total / meta.limit); i++) {
      pageArray.push(i);
    }
    console.log(pageArray);
  }

  useEffect(() => {
    fetchData({ pageIndex, searchQuery, searchFilters });
  }, [fetchData, searchQuery, searchFilters, pageIndex]);

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const setSelectedFilter = (e) => {
    let filtersInner = filters;
    console.log(e.target.value);
    console.log(filtersInner);
    //  props.fetchFilters({ filters: filtersInner });
    //    fetchData({ limit, searchQuery, searchFilters });
  };

  const setPage = (event) => {
    console.log(event.target.id);
    setPageIndex(event.target.id);
  };

  const getSingleView = (id) => {
    console.log(id);
    history.push("/news/" + id);
  };

  return (
    <>
      <div className="news-left ">
        <div>
          <div class="card mb-3  ">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  className="h-300 w-100"
                  src={"http://localhost:5000/static/defaultNews.png"}
                  alt="..."
                />
              </div>
              <div class="col-md-8">
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
        </div>
        <div className="news-body">
          {data &&
            data.length > 0 &&
            data.map((item) => {
              return (
                <div
                  onClick={() => getSingleView(item.id)}
                  key={item.id}
                  className="card grid-column "
                >
                  <img
                    className="card-img-top h-150"
                    src={
                      item.filePath
                        ? item.filePath
                        : "http://localhost:5000/static/defaultNews.png"
                    }
                    alt="..."
                  />
                  <div class="card-body ">
                    <p class="card-text">
                      This is a longer card with supporting text below as a
                      natural lead-in to additional content. This content is a
                      little bit longer.
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="news-pagination mt-30 ">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button class="page-link" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>

              {pageArray.map((number) => {
                return (
                  <li key={number} class="page-item">
                    <button id={number} onClick={setPage} class="page-link">
                      {number}
                    </button>
                  </li>
                );
              })}

              <li class="page-item">
                <button class="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="news-right">
        <>
          <div className="filter filter--search ">
            <div class="form-group">
              <label for="searchInput">Search</label>
              <input
                type="text"
                id="searchInput"
                className="form-control"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={onSearchChange}
              />
            </div>

            <div class="form-group mt-30">
              <select
                class="form-select"
                onChange={setSelectedFilter}
                aria-label="Default select example"
              >
                <option value="0">Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default DataGrid;
