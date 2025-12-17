import { useState, useEffect } from "react";

const useTableData = (initialData = []) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const resetSearch = () => {
    setSearchText("");
  };

  return {
    data,
    setData,
    searchText,
    handleSearch,
    resetSearch,
  };
};

export default useTableData;