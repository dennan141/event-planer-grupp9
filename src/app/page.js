"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";
import { usePathname } from "next/navigation";

export default function Home() {
  Database.createDatabase();
  const [eventData, setEventData] = useState([]);


  useEffect(() => {
    async function fetchData() {
      setEventData(await Database.getAllEvents());
    }
    fetchData();
  }, []);

  // * Ready rendered page
  return (
    <>
      <EventTable eventsRowList={eventData} />
    </>
  );
}
