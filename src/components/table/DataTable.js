import React, { useEffect, useState } from "react";

import { useTable, usePagination } from "react-table";

const DataTable = (props) => {
  const { columns, data, pageCount: controlledPageCount, fetchData } = props;
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

  const [searchQuery, setSearchQuery] = useState(null);
  const searchFilters = props.searchFilters;
  //Load initial data and filters into data table
  useEffect(() => {
    fetchData({ pageIndex, pageSize, searchQuery, searchFilters });
  }, [fetchData, pageIndex, pageSize, searchQuery, searchFilters]);

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

  return (
    <>
      <div className="p-10-0 d-flex ">
        {props.name !== "payments" && (
          <div className="form-group mr-30">
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
        )}

        {props.initialFilters &&
          props.initialFilters.map((element, i) => {
            return (
              <div key={i} className="form-group ">
                <select
                  onChange={(e) => setSelectedFilter(e, element.searchName)}
                  className="form-select"
                  aria-label="Default select example"
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
      </div>
      <table className="table table-striped table-hover" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {data &&
            page.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
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
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(page);
              }}
              style={{ width: "100px" }}
            />
          </span>{" "}
        </div>
      )}
    </>
  );
};

export default DataTable;
