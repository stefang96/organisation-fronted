import React, { useEffect, useState } from "react";
import { useTable, usePagination } from "react-table";

const DataGrid = (props) => {
  const { data, fetchData, limit, total, searchFilters } = props;
  const filters = props.initialFilters;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData({ limit, searchQuery, searchFilters });
  }, [fetchData, searchQuery, searchFilters, limit]);
  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const setSelectedFilter = (list, searchName, trashed, clear) => {
    const filterList = [];
    let filtersInner = filters;

    props.fetchFilters({ filters: filtersInner });
    fetchData({ limit, searchQuery, searchFilters });
  };

  return (
    <>
      <div className="news-left">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-6">
              <img src="..." alt="..." />
            </div>
            <div class="col-md-6">
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
        <div className="news-body">
          {data.length > 0 &&
            data.map((item) => {
              return (
                <div class="card flex-30">
                  <img src="..." class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="news-right">
        <>
          <div className="filter filter--search">
            <input type="text" name="search" onChange={onSearchChange} />
          </div>
        </>
      </div>
    </>
  );
};

export default DataGrid;
