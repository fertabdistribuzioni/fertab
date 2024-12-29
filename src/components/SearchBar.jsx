// SearchBar.jsx
import { useRef } from "react";
import PropTypes from 'prop-types';
import closeIcon from "../assets/closeIcon.svg";
import searchIcon from "../assets/searchIcon.svg";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleFocusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div id="searchBar">
      <input ref={inputRef} type="text" name="searchTerm" placeholder="Cerca prodotto..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div id="searchBarButton" onClick={searchTerm ? handleClearSearch : handleFocusInput}>
        <img src={searchTerm ? closeIcon : searchIcon} alt={searchTerm ? "Cancella" : "Cerca"} />
      </div>
    </div>
  );
};

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.string.isRequired,
}

export default SearchBar