export const getStudentColumnDefs = (actionCellRenderer) => [
  {
    field: "id",
    headerName: "Id",
    width: 100,
    filter: true,
  },
  {
    field: "grade",
    headerName: "Grade",
    width: 120,
    filter: true,
  },
  {
    field: "name",
    headerName: "Name",
    width: 220,
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
    headerName: "Action (Edit, Delete)",
    width: 180,
    pinned: "right",
    cellRenderer: actionCellRenderer,
    sortable: false,
    filter: false,
    cellStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
  },
];