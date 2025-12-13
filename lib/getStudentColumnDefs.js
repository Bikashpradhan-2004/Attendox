export const getStudentColumnDefs = (actionCellRenderer) => [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    filter: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
    filter: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 250,
    filter: true,
  },
  {
    field: "contact",
    headerName: "Contact",
    width: 180,
    filter: true,
  },
  {
    headerName: "Action",
    width: 120,
    pinned: "right",
    cellRenderer: actionCellRenderer,
    sortable: false,
    filter: false,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
];
