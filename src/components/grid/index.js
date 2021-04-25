import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import history from "../../history";
import moment from "moment";
import loggedUser from "../../utils/getLoggedUser";

const DataGrid = (props) => {
  const user = loggedUser();
  const { data, fetchData, searchFilters, meta, fetchPage } = props;
  // const { limit, page, total } = props.meta;
  console.log(meta);
  const filters = props.initialFilters;
  const [searchQuery, setSearchQuery] = useState(null);

  const pageArray = [];
  const { pageCount: controlledPageCount, columns } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: controlledPageCount,
    },
    usePagination
  );

  useEffect(() => {
    fetchData({ pageIndex, searchQuery, searchFilters });
  }, [fetchData, pageIndex]);

  const onSearchChange = (e) => {
    console.log(e.target.value);
    // setSearchQuery(e.target.value);
  };

  const setSelectedFilter = (e) => {
    let filtersInner = filters;
    console.log(e.target.value);
    console.log(filtersInner);
    //  props.fetchFilters({ filters: filtersInner });
    //    fetchData({ limit, searchQuery, searchFilters });
  };

  const getSingleView = (id) => {
    console.log(id);
    history.push("/news/" + id);
  };

  return (
    <>
      <div className="news-left bg-color-light-grey ">
        <div className=" ">
          <div class="row">
            <div class="col-md-12 d-flex flex-wrap ">
              {data &&
                data.length > 0 &&
                data.map((item) => {
                  return (
                    <div class="post-slide  ">
                      <div className="actions ">
                        <div className="d-flex actions_buttons">
                          <button
                            onClick={() => props.editNews(item.id)}
                            className="btn   h-50-px   w-100"
                          >
                            <i class="bi bi-pencil-square color-app-blue ml-5-px mr-5-px"></i>
                          </button>
                          <button
                            onClick={() => props.removeNews(item.id)}
                            className="btn  h-50-px   w-100"
                          >
                            <i class="bi bi-x-circle-fill h-50-px color-app-red mr-5-px"></i>
                          </button>
                        </div>
                      </div>
                      <div
                        class="  cursor-pointer"
                        onClick={() => getSingleView(item.id)}
                      >
                        <div class="post-img">
                          <a href="#">
                            <img
                              src={
                                item.filePath
                                  ? item.filePath
                                  : "http://localhost:5000/static/defaultNews.png"
                              }
                              alt=""
                            />
                            <div class="post-date">
                              <span class="date">
                                {moment.unix(item.createdAt, "DD").format("DD")}
                              </span>
                              <span class="month">
                                {moment
                                  .unix(item.createdAt, "MM")
                                  .format("MMMM")}
                              </span>
                            </div>
                          </a>
                        </div>
                        <div class="post-review">
                          <h3 class="post-title">
                            <a href="#">{item.title}</a>
                          </h3>
                          <ul class="post-bar">
                            <li>
                              <i class="bi bi-person-fill"></i>
                              <a href="#">
                                {item.member.firstName +
                                  " " +
                                  item.member.lastName}
                              </a>
                            </li>
                            <li>
                              <i class="bi bi-building"></i>
                              <a href="#">{item.member.organisation.name}</a>
                            </li>
                          </ul>

                          <p class="post-description">
                            {item.shortDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="news-pagination mt-30 ">
          {pageCount > 1 && (
            <div className=" ">
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                      class="page-link"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      class="page-link"
                      href="#"
                    >
                      {" "}
                      {"<"}
                    </button>
                  </li>
                  <li class="page-item">
                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      class="page-link"
                      href="#"
                    >
                      {" "}
                      {">"}
                    </button>
                  </li>

                  <li class="page-item">
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                      class="page-link"
                      href="#"
                      aria-label="Next"
                    >
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(page);
                  }}
                  style={{ width: "100px" }}
                />
              </span>{" "}
            </div>
          )}
        </div>
      </div>
      <div className="news-right ">
        <>
          <div className="p-30  h-auto bg-color-light-grey">
            <div className="filter filter--search ">
              {true && (
                <button
                  onClick={() => props.createNews()}
                  className="btn btn-create-news h-50-px mb-30 w-100    "
                >
                  <div className="center">
                    <i className="bi bi-plus-square mr-10"></i>
                    <span>Create news</span>
                  </div>
                </button>
              )}
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

              {!props.profile && (
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
              )}
            </div>
          </div>
          <div class="form-group mt-30">
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
        </>
      </div>
    </>
  );
};

export default DataGrid;
