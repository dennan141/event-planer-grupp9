"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import DummyData from "./../Components/DummyData/Data.json";
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";

export default function Home() {
  Database.createDatabase();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    
  }, []);

  return (
    <>
      <EventTable eventsRowList={eventData} />
    </>
  );
}
