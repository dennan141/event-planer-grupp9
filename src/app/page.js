"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import DummyData from "./../Components/DummyData/Data.json"
import { useEffect, useState } from "react";
import * as Database from "@/Components/IndexedDb/Database";

export default function Home() {
  Database.createDatabase();
  const [eventData, setEventData] = useState(DummyData);

  useEffect(() => {
    //setEventData(Data);
  }, []);

  useEffect(() => {
    if (eventData.length > 0) {
      Database.set(eventData[0]);
    }
  }, [eventData]);

  return (
    <>
      <EventTable eventsRowList={eventData} />
    </>
  );
}
