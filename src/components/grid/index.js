import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";
import history from "../../history";
import moment from "moment";
import loggedUser from "../../utils/getLoggedUser";

const DataGrid = (props) => {
  const user = loggedUser();
  const { data, fetchData, searchFilters, meta, fetchPage } = props;

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
  }, [fetchData, pageIndex, searchQuery, searchFilters]);

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };

  const setSelectedFilter = (e, searchName) => {
    // let filtersInner = props.searchFilters;
    console.log(e.target.value);
    const valueData = e.target.value;
    const value = valueData === "null" ? null : valueData;

    for (let key in searchFilters) {
      if (key === searchName) {
        searchFilters[key] = value;
      }
    }

    //  props.fetchFilters({ filters: filtersInner });
    fetchData({ pageIndex, searchQuery, searchFilters });
  };

  const getSingleView = (id) => {
    console.log(id);
    history.push("/news/" + id);
  };

  return (
    <>
      <div className="news-left bg-color-light-grey ">
        <div className=" ">
          <div className="row">
            <div className="col-md-12 d-flex flex-wrap ">
              {data &&
                data.length > 0 &&
                data.map((item) => {
                  return (
                    <div className="post-slide  " key={`news-${item.id}`}>
                      <div className="actions ">
                        <div className="d-flex actions_buttons">
                          <button
                            onClick={() => props.editNews(item.id)}
                            className="btn   h-50-px   w-100"
                          >
                            <i className="bi bi-pencil-square color-app-blue ml-5-px mr-5-px"></i>
                          </button>
                          <button
                            onClick={() => props.removeNews(item.id)}
                            className="btn  h-50-px   w-100"
                          >
                            <i className="bi bi-x-circle-fill h-50-px color-app-red mr-5-px"></i>
                          </button>
                        </div>
                      </div>
                      <div
                        className="  cursor-pointer"
                        onClick={() => getSingleView(item.id)}
                      >
                        <div className="post-img">
                          <a href="#">
                            <img
                              src={
                                item.filePath
                                  ? item.filePath
                                  : "http://localhost:5000/static/defaultNews.png"
                              }
                              alt=""
                            />
                            <div className="post-date">
                              <span className="date">
                                {moment.unix(item.createdAt, "DD").format("DD")}
                              </span>
                              <span className="month">
                                {moment
                                  .unix(item.createdAt, "MM")
                                  .format("MMMM")}
                              </span>
                            </div>
                          </a>
                        </div>
                        <div className="post-review">
                          <h3 className="post-title">
                            <a href="#">{item.title}</a>
                          </h3>
                          <ul className="post-bar">
                            <li>
                              <i className="bi bi-person-fill"></i>
                              <a href="#">
                                {item.member.firstName +
                                  " " +
                                  item.member.lastName}
                              </a>
                            </li>
                            <li>
                              <i className="bi bi-building"></i>
                              <a href="#">{item.member.organisation.name}</a>
                            </li>
                          </ul>

                          <p className="post-description">
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
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                    >
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                      className="page-link"
                      href="#"
                    >
                      {" "}
                      {"<"}
                    </button>
                  </li>
                  <li className="page-item">
                    <button
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                      className="page-link"
                      href="#"
                    >
                      {" "}
                      {">"}
                    </button>
                  </li>

                  <li className="page-item">
                    <button
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                      className="page-link"
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
              {user && !props.isMyPofile && (
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
              <div className="form-group">
                <label htmlFor="searchInput">Search</label>
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
                <>
                  {user ? (
                    <div className="form-group mt-30">
                      <select
                        className="form-select"
                        onChange={(e) => setSelectedFilter(e, "memberId")}
                        aria-label="Default select example"
                      >
                        <option value="null">All members</option>
                        <option value="10">Marko Markovic</option>
                        <option value="9">Stefan</option>
                      </select>
                    </div>
                  ) : (
                    <>
                      {props.initialFilters &&
                        props.initialFilters.map((element, i) => {
                          return (
                            <div key={i} className="form-group mt-30">
                              <select
                                onChange={(e) =>
                                  setSelectedFilter(e, element.searchName)
                                }
                                className="form-select"
                              >
                                {element.list.map((filter, i) => {
                                  return (
                                    <option key={i} value={filter.value}>
                                      {filter.title}
                                    </option>
                                  );
                                })}
                              </select>
                            </div>
                          );
                        })}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="form-group mt-30">
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
                  A third itemA third itemA third itemA third itemA third item
                </div>
              </li>
              <li className="list-group-item">
                {" "}
                <h5>
                  <b>A third item</b>{" "}
                </h5>
                <div>
                  A third itemA third itemA third itemA third itemA third item
                </div>
              </li>
              <li className="list-group-item">
                {" "}
                <h5>
                  <b>A third item</b>{" "}
                </h5>
                <div>
                  A third itemA third itemA third itemA third itemA third item
                </div>
              </li>
              <li className="list-group-item">
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
