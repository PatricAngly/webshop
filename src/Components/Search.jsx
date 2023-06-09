import PrefsContext from "../context/PrefsContext";
import { useContext } from "react";
import { useState } from "react";
import SearchResultComponent from "./SearchResult";

function SearchComponent() {
  const userPrefs = useContext(PrefsContext); // to use or update global states
  const [searchTerm, setSearchTerm] = useState(""); // sate for search string
  function searchResult() {
    // filter a new array with products that matches/incluedes the search term string
    const filteredProducts = userPrefs.products.filter(
      (item) =>
        item.namn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.beskrivning.toLowerCase().includes(searchTerm.toLowerCase())
    );
    userPrefs.setResult(filteredProducts); // updates the result state with a filtered array based on search
  }

  return (
    <div>
      <div>
        <label className="block text-center">Sök</label>
        <div className="text-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className=" w-1/5 p-2 text-sm border border-gray-300 rounded"
          />
          <button
            className="bg-blue-500 m-auto p-2 px-4 ml-2 rounded"
            onClick={searchResult}
          >
            Sök
          </button>
        </div>
      </div>
      <div>
        <SearchResultComponent />
      </div>
    </div>
  );
}
export default SearchComponent;
