import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetSearchValue } from "../../actions/bugReport";
import "./SearchBar.css";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const action = SetSearchValue(searchTerm);
    dispatch(action);
  }, [dispatch, searchTerm]);
  return (
    <div>
      <div className="search-field">
        <input
          type="text"
          className="input_search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        {searchTerm.length > 0 ? (
          <p
            onClick={() => {
              setSearchTerm("");
            }}
            className="button-clear"
          >
            X
          </p>
        ) : null}
      </div>
    </div>
  );
}
