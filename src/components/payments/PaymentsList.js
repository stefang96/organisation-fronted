import React, { useCallback, useState, useEffect } from "react";
import "../table/table.scss";
import { getPayments, getMembers } from "../../actions/index";
import DataTable from "../table/DataTable";
import { connect } from "react-redux";
import moment from "moment";
import "../table/table.scss";

const PaymentsList = (props) => {
  const [filters, setFilters] = useState(null);
  const [searchFilters] = useState({
    memberId: null,
  });

  useEffect(() => {
    props.getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let membersList = [
    {
      id: 0,
      title: "All members",
      value: "null",
    },
  ];

  props.membersList &&
    props.membersList.map((member, i) => {
      i = i + 1;
      return membersList.push({
        id: i,
        title: member.firstName + " " + member.lastName,
        value: member.id,
      });
    });

  let initialFilters = [];
  if (!props.profile) {
    initialFilters = [
      {
        title: "All members",
        searchName: "memberId",
        list: membersList,
      },
    ];
  }

  //Fetch and  rewrite filters based on selected filter
  const fetchFilters = React.useCallback(({ filters }) => {
    setFilters(filters);
  }, []);

  const dateCell = ({ value }) => {
    if (!value) {
      return <div>-</div>;
    }

    return <div>{moment.unix(value).format("MMMM Do YYYY")}</div>;
  };

  const priceCell = ({ value }) => {
    if (!value) {
      return <div>-</div>;
    }

    return (
      <div>
        {" "}
        <b>{value}</b> $
      </div>
    );
  };

  const memberCell = (props) => {
    const member = props.row.original.member;
    if (!member) {
      return <div>-</div>;
    }

    return <div>{member.firstName + " " + member.lastName}</div>;
  };
  const columns = React.useMemo(
    () => [
      {
        Header: " ",
      },
      {
        Header: "  ",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: priceCell,
      },
      {
        Header: "From Date",
        accessor: "fromDate",
        Cell: dateCell,
      },
      {
        Header: "To date",
        accessor: "toDate",
        Cell: dateCell,
      },
      {
        Header: "Member",
        accessor: "member",
        Cell: memberCell,
      },
      {
        Header: "",
        accessor: "action",
      },
    ],
    []
  );

  //Fetch data into list, based on current page, search query or selected filters
  const fetchData = useCallback(
    ({ pageIndex, pageSize, searchFilters }) => {
      window.scrollTo(0, 0);

      const pagination = {
        page: pageIndex + 1,
      };
      const filters = {
        memberId: searchFilters.memberId,
      };
      let reqData = {
        pagination: pagination,
        filters: filters,
      };
      if (props.memberId) {
        reqData = {
          pagination: pagination,
          filters: filters,
          memberId: props.memberId,
        };
      }

      props.getPayments(reqData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let data = [];
  const meta = props.paymentMeta;

  if (props.paymentList) {
    data = props.paymentList;
  }

  return (
    <div>
      {props.profile ? (
        <DataTable
          name="payments"
          fetchData={fetchData}
          fetchFilters={fetchFilters}
          initialFilters={!filters ? initialFilters : filters}
          searchFilters={searchFilters}
          data={data}
          columns={columns}
          pageCount={meta && Math.ceil(meta.total / meta.limit)}
        />
      ) : (
        <div className="container-body ">
          <div className="table-view">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="d-flex">
                  <div>
                    <h2>
                      Payments <b>Management</b>
                    </h2>
                  </div>
                </div>
              </div>

              <DataTable
                name="payments"
                fetchData={fetchData}
                fetchFilters={fetchFilters}
                initialFilters={!filters ? initialFilters : filters}
                searchFilters={searchFilters}
                data={data}
                columns={columns}
                pageCount={meta && Math.ceil(meta.total / meta.limit)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    paymentList: state.payment.paymentList,
    paymentMeta: state.payment.paymentMeta,
    membersList: state.member.memberList,
  };
};
export default connect(mapStateToProps, { getPayments, getMembers })(
  PaymentsList
);
