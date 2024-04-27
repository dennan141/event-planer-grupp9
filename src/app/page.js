"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";
import { useRouter } from "next/navigation";
import populateDatabase from "@/Components/IndexedDb/PopulateDatabase/PopulateDatabase";

export default function Home() {
  const router = useRouter();
  const [eventData, setEventData] = useState([]);
  const [latestActivity, setLatestActivity] = useState(null);
  const [lastUpdatedEvent, setLastUpdatedEvent] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setEventData(await Database.getAllEvents());
      
      // Fetch latest activity
      const latestActivityData = sessionStorage.getItem('latestActivity');
      if (latestActivityData) {
        setLatestActivity(JSON.parse(latestActivityData));
      }
      
      // Fetch last updated event
      const lastUpdatedEventData = sessionStorage.getItem("lastUpdatedEvent");
      if (lastUpdatedEventData) {
        setLastUpdatedEvent(JSON.parse(lastUpdatedEventData));
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

  const handleLatestActivityClick = () => {
    if (latestActivity) {
      router.push(`/event/${latestActivity.id}`);
    }
  };

  const handleLastUpdatedClick = () => {
    if (lastUpdatedEvent) {
      router.push(`/event/${lastUpdatedEvent.id}`);
    }
  };

  return (
    <>
      {latestActivity && (
        <tr onClick={handleLatestActivityClick} className="cursor-pointer">
          <td colSpan="4">
            <table className="table w-80 bg-error text-gray-800">
              <tbody>
                <tr>
                  <th colSpan="2" className="table-title text-lg font-semibold">{latestActivity.title}</th>
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
          </td>
        </tr>
      )}

      {lastUpdatedEvent && (
        <div className="container mx-auto">
          <table
            className="table w-80 bg-error text-gray-800 cursor-pointer mx-auto"
            onClick={handleLastUpdatedClick}
          >
            <tbody>
              <tr>
                <th colSpan="2" className="table-title text-lg font-semibold">
                  {lastUpdatedEvent.title}
                </th>
              </tr>
              <tr>
                <td className="font-semibold">Beskrivning:</td>
                <td>{lastUpdatedEvent.description}</td>
              </tr>
              <tr>
                <td className="font-semibold">Datum & Tid:</td>
                <td>{lastUpdatedEvent.date}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <EventTable eventsRowList={eventData} />
    </>
  );
}
