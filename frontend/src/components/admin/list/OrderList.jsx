import styled from "styled-components";
import * as React from "react";
import { DataGrid } from "@mui/x-data-grid/DataGrid/";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { ordersEdit, ordersFetch } from "../../../features/orderSlice";
import moment from "moment";

export default function OrderList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.orders);
  console.log(list);
  React.useEffect(() => {
    dispatch(ordersFetch());
  }, [dispatch]);

  const rows =
    list &&
    list.map((order) => {
      return {
        id: order._id,
        cName: order.shipping.name,
        amount: (order.total / 100)?.toLocaleString(),
        dStatus: order.delivery_status,
        date: moment(order.createdAt).fromNow(),
      };
    });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "cName",
      headerName: "Name",
      width: 120,
    },
    { field: "amount", headerName: "amount($)", width: 100 },
    {
      field: "dStatus",
      headerName: "delivery_status",
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            {params.row.dStatus === "pending" ? (
              <Pending>Pending</Pending>
            ) : params.row.dStatus === "dispatch" ? (
              <Dispatched>Dispatch</Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>Delivered</Delivered>
            ) : (
              "error"
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 220,
      renderCell: (params) => {
        return (
          <Action>
            <DispatchBtn onClick={() => handleOrderDispatch(params.row.id)}>
              Dispatch
            </DispatchBtn>
            <DeliveryBtn onClick={() => handleOrderDeliver(params.row.id)}>
              Deliver
            </DeliveryBtn>
            <Views onClick={() => navigate(`/order/${params.row.id}`)}>
              View
            </Views>
          </Action>
        );
      },
    },
  ];

  const handleOrderDispatch = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "dispatch" }));
  };
  const handleOrderDeliver = (id) => {
    dispatch(ordersEdit({ id, delivery_status: "delivered" }));
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}

const DispatchBtn = styled.button`
  background-color: rgba(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgba(102, 108, 255);
`;

const Views = styled.button`
  background-color: rgba(114, 255, 40);
`;
const Pending = styled.div`
  color: rgba(253, 181, 40);
  background-color: rgba(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Dispatched = styled.div`
  color: rgba(38, 198, 249);
  background-color: rgba(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgba(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
const Action = styled.div`
width :100%;
display : flex ; 
justify-content : space-between;
button{
  border : none ;
  outline : none ;
  padding : 3px 5px;
  color : white;
  border-radius : 3px ;
  cursor pointer; 
}


`;
