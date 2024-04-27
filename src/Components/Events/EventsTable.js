"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventTable({ eventsRowList }) {
  const router = useRouter();

  // ! -----------------------------
  // ! CREATE SESSIONSTORAGE HERE TO STORE ORDER AND SORTCHOICE FOR USER
  // ! -----------------------------
  const [sortChoice, setSortChoice] = useState("idHeader");
  const [order, setOrder] = useState("asc"); // asc or des

  /* Handle the click of an event row */
  const handleRowClick = (event) => {
    // * Handle event here
    router.push(`/event/${event.id}`);
  };

  useEffect(() => {}, [sortChoice]);

  //* -----------------------------
  //* SORTING

  const sortingFunc = (id) => {
    switch (id) {
      case "idHeader":
        if (sortChoice == "idHeader") toogleOrder();
        setSortChoice(id);
        break;

      case "titleHeader":
        if (sortChoice === "titleHeader") toogleOrder();
        setSortChoice(id);
        break;

      case "dateHeader":
        if (sortChoice === "dateHeader") toogleOrder();
        setSortChoice(id);
        break;

      default:
        break;
    }
  };

  const toogleOrder = () => {
    if (order === "des") {
      setOrder("asc");
    } else setOrder("des");
  };
  //* END OF SORTING
  //* -----------------------------

  //? -----------------------------
  //? RENDERING OF TABLE FOR ALL EVENTS
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {/* ID */}
            <th
              id="idHeader"
              onClick={() => sortingFunc("idHeader")}
              className="cursor-pointer"
            >
              ID{" "}
              {sortChoice === "idHeader" ? (order === "asc" ? "🔼" : "🔽") : ""}
            </th>
            {/* TITLE */}
            <th
              id="titleHeader"
              onClick={() => sortingFunc("titleHeader")}
              className="cursor-pointer"
            >
              Titel{" "}
              {sortChoice === "titleHeader"
                ? order === "asc"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            {/* DATE */}
            <th
              id="dateHeader"
              onClick={() => sortingFunc("dateHeader")}
              className="cursor-pointer"
            >
              Datum{" "}
              {sortChoice === "dateHeader"
                ? order === "asc"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            <th>Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {eventsRowList.map((event) => (
            <tr
              key={event.id}
              className="hover cursor-pointer"
              onClick={() => handleRowClick(event)}
            >
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <Link key={event.id} href={`event/${event.id}`} passHref></Link> */
}
