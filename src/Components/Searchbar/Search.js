"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const Search = () => {
  const [query, setQuery] = useState("");

  //APIs needed for navigation and search
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(queryString) {
    const params = new URLSearchParams(searchParams);
    setQuery(queryString);
    if (queryString) {
      params.set("query", queryString);
    } else {
      params.delete("query");
    }
    console.log("Query: " + query);
    console.log("pathnam: " + pathname);
    console.log("params" + params);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex">
      <label htmlFor="search" className="label">
        🔎
        <input
          name="search"
          type="text"
          placeholder="Sök efter titel..."
          className="input input-bordered w-full flex max-w-xs"
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </label>
      {/* Dynamiskt visa resultat baserat på 'query' */}
    </div>
  );
};

export default Search;
