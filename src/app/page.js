"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";
import { useRouter } from "next/navigation";
import populateDatabase from "@/Components/IndexedDb/PopulateDatabase/PopulateDatabase";
import Search from "@/Components/Searchbar/Search";

export default function Home() {
  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [latestActivity, setLatestActivity] = useState(null);

  //TODO: #32 Consider chagning this to component as well.
  // * ---------- POPULATE WITH DATA --------------
  useEffect(() => {
    async function fetchData() {
      setEventData(await Database.getAllEvents());
      console.log(eventData);

      // Fetch latest activity
      const latestActivityData = sessionStorage.getItem("latestActivity");
      if (latestActivityData) {
        setLatestActivity(JSON.parse(latestActivityData));
      }
    }

    // If the database does not have any keys, create some events
    Database.keys().then((result) => {
      if (result.length <= 0) {
        populateDatabase();
      }
    });

    fetchData();
  }, []);
  // * --------------------------------------------

  // * --------------- LATEST ACTIVITY -------------
  const handleLatestActivityClick = () => {
    console.log("In handler: " + latestActivity);
    if (latestActivity) {
      router.push(`/event/${latestActivity.id}`);
    }
  };
  // * --------------------------------------------

  return (
    <>
      {latestActivity && (
        <div className="container mx-auto">
          <table
            className="table w-80 m-2 bg-primary text-primary-content cursor-pointer mx-auto"
            onClick={handleLatestActivityClick}
          >
            <tbody>
              <tr>
                <th colSpan="2" className="table-title text-lg font-semibold">
                  {latestActivity.title}
                </th>
              </tr>
              <tr>
                <td className="font-semibold">Beskrivning:</td>
                <td>{latestActivity.description}</td>
              </tr>
              <tr>
                <td className="font-semibold">Datum & Tid:</td>
                <td>{latestActivity.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <Search />
      <EventTable eventsRowList={eventData}  />
    </>
  );
}
