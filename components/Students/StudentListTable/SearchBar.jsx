import { IoSearch } from "react-icons/io5";

const SearchBar = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <div className="p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-w-sm items-center">
      <IoSearch className="text-gray-500" />
      <input
        type="text"
        placeholder={placeholder}
        className="outline-none w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
