import moment from "moment";

const isFutureDate = (day, selectedMonth) => {
  const currentDate = moment();
  const cellDate = moment(selectedMonth).date(day);
  return cellDate.isAfter(currentDate, "day");
};

const createDayColumn = (day, selectedMonth) => {
  const isFuture = isFutureDate(day, selectedMonth);

  return {
    field: day.toString(),
    width: 50,
    editable: !isFuture,
    cellStyle: isFuture ? { backgroundColor: "#f1f1f1", color: "#999" } : {},
  };
};

export const buildColumnDefinitions = (daysArray, selectedMonth) => {
  const staticColumns = [
    { field: "studentId", filter: true, width: 140 },
    { field: "name", filter: true, width: 300 },
  ];

  const dayColumns = daysArray.map((day) =>
    createDayColumn(day, selectedMonth)
  );

  return [...staticColumns, ...dayColumns];
};
