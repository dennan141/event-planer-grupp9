"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";
import { useRouter } from "next/navigation";

export default function Home() {
  Database.createDatabase();
  const [eventData, setEventData] = useState([]);
  const [lastUpdatedEvent, setLastUpdatedEvent] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      setEventData(await Database.getAllEvents());
      const lastUpdatedEventData = sessionStorage.getItem('lastUpdatedEvent');
      if (lastUpdatedEventData) {
        setLastUpdatedEvent(JSON.parse(lastUpdatedEventData));
      }
    }
    fetchData();
  }, []); 

  const handleLastUpdatedClick = () => {
    router.push(`/event/${lastUpdatedEvent.id}`);
  };

  return (
    <>
      {lastUpdatedEvent && (
        <tr>
          <td colSpan="4" onClick={handleLastUpdatedClick} className="cursor-pointer"> {/* Lägg till en onClick-händelse för att hantera klick på den senaste aktiviteten */}
            <table className="table w-80 bg-error text-gray-800">
              <tbody>
                <tr>
                  <th colSpan="2" className="table-title text-lg font-semibold">{lastUpdatedEvent.title}</th>
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
          </td>
        </tr>
      )}
      <EventTable eventsRowList={eventData} />
    </>
  );
}
