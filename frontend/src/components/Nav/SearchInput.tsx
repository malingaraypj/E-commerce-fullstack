import { CiSearch } from "react-icons/ci";
import { List } from "lucide-react";

function SearchInput() {
  return (
    <div className="flex items-center bg-blue-100 px-4 py-2 rounded-md justify-between border border-blue-300 m-4 focus-within:ring-1 focus-within:ring-blue-300">
      {/* Search Icon */}
      <CiSearch className="text-blue-500" size={20} />

      {/* Input */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 ml-3 bg-transparent outline-none placeholder-blue-400 text-blue-900"
      />

      {/* List Icon */}
      <List className="text-blue-500 cursor-pointer" size={20} />
    </div>
  );
}

export default SearchInput;
