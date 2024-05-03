"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Search from "../Search/SearchList";

export default function EventTable({ eventsRowList, searchQuery }) {
  const router = useRouter();

  // ! -----------------------------
  // ! CREATE SESSIONSTORAGE HERE TO STORE ORDER AND SORTCHOICE FOR USER
  // ! -----------------------------

  const [sortChoice, setSortChoice] = useState("idHeader");
  const [order, setOrder] = useState("des"); // asc or des || Ascending or Descending
  const [sortedEventsList, setSortedEventsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* Handle the click of an event row */
  const handleRowClick = (event) => {
    router.push(`/event/${event.id}`);
  };


  const handleKeyDown = (event, id) => {
    if (event.key === "Enter") {
      sortingFunc(id);
    }
  };

  const navigateToEvent = (id) => {
    if (event.key === "Enter") {
    router.push(`/event/${id}`);
    }
  };

  //* -----------------------------
  //* SORTING

  useEffect(() => {
    setSortedEventsList([...eventsRowList]);
  }, [eventsRowList]);

  useEffect(() => {
    setIsLoading(true);
    let sortedEvents = [];

    if (searchQuery === "") {
      sortedEvents = [...eventsRowList];
    } else {
      const filteredList = eventsRowList.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      sortedEvents = filteredList;
    }

    setSortChoice(sessionStorage.getItem("sortChoice"));
    setOrder(sessionStorage.getItem("sortOrder"));

    // * ID
    if (sortChoice === "idHeader") {
      sortedEvents.sort((oldEvent, newEvent) => oldEvent.id - newEvent.id);
    }

    //* TITLE
    if (sortChoice === "titleHeader") {
      sortedEvents.sort((a, b) => {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();

        //Compares each letter and moves accordingly
        if (titleA < titleB) return -1;
        if (titleA > titleB) return 1;
        return 0; //If letters are the same
      });
    }

    //* DATE
    if (sortChoice === "dateHeader") {
      sortedEvents.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }

    //* Change order of array if order is 'DES'
    if (order === "des") {
      setSortedEventsList(sortedEvents.reverse());
    }
    setSortedEventsList(sortedEvents);

    setIsLoading(false);
  }, [sortChoice, order, eventsRowList, searchQuery]);

  const sortingFunc = (id) => {
    switch (id) {
      case "idHeader":
        if (sortChoice == "idHeader") toogleOrder();
        setSortChoice(sessionStorage.setItem("sortChoice", id));
        break;

      case "titleHeader":
        if (sortChoice === "titleHeader") toogleOrder();
        setSortChoice(sessionStorage.setItem("sortChoice", id));
        break;

      case "dateHeader":
        if (sortChoice === "dateHeader") toogleOrder();
        setSortChoice(sessionStorage.setItem("sortChoice", id));
        break;

      default:
        break;
    }
  };

  const toogleOrder = () => {
    if (sessionStorage.getItem("sortOrder") === "des") {
      sessionStorage.setItem("sortOrder", "asc");
    } else sessionStorage.setItem("sortOrder", "des");
  };

  //* END OF SORTING
  //* -----------------------------

  //? -----------------------------
  //? RENDERING OF TABLE FOR ALL EVENTS
  return (
    <div className="overflow-x-auto">
      <Loading isLoading={isLoading} />
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-lg">
            {/* ID */}
            <th
              id="idHeader"
              onClick={() => sortingFunc("idHeader")}

              onKeyDown={(e) => handleKeyDown(e, "idHeader")}
              className="cursor-pointer text text-gray-200"
              tabIndex="0"

            >
              ID{" "}
              {sortChoice === "idHeader" ? (order === "asc" ? "🔼" : "🔽") : ""}
            </th>
            {/* TITLE */}
            <th
              id="titleHeader"
              onClick={() => sortingFunc("titleHeader")}

              onKeyDown={(e) => handleKeyDown(e, "titleHeader")}
              className="cursor-pointer text text-gray-200"
              tabIndex="0"

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

              onKeyDown={(e) => handleKeyDown(e, "dateHeader")}
               className="cursor-pointer text text-gray-200"
              tabIndex="0"
            >
              Datum{" "}
              {sortChoice === "dateHeader"
                ? order === "asc"
                  ? "🔼"
                  : "🔽"
                : ""}
            </th>
            <th className="text text-gray-200">Beskrivning</th>
          </tr>
        </thead>
        <tbody>

          {sortedEventsList.map((event) => (
            <tr
              key={event.id}
              className="hover cursor-pointer"
              onClick={() => handleRowClick(event)}
              onKeyDown={(e) => navigateToEvent(event.id)}
              tabIndex="0" 
            >
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td >{event.date}</td>
              <td>{event.description}</td>
            </tr>
          ))}

          {sortedEventsList.length > 0
            ? sortedEventsList.map((event) => (
                <tr
                  key={event.id}
                  className="hover cursor-pointer  text text-white font-monospace"
                  onClick={() => handleRowClick(event)}
                  onKeyDown={(e) => navigateToEvent(event.id)}
                  tabIndex="0" 
                >
                  <td>{event.id}</td>
                  <td>{event.title}</td>
                  <td>{event.date}</td>
                  <td>{event.description}</td>
                </tr>
              ))
            : null}

        </tbody>
      </table>
    </div>
  );
}
