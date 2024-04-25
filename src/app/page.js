"use client";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import Data from "@/Components/DummyData/Data";
import { useEffect, useState } from "react";
import Database from "@/Components/IndexedDb/Database"

export default function Home() {
  const db = Database()
  const [dummyData, setDummyData] = useState([]);

  useEffect(() => {
    setDummyData(Data);
  }, []);

  useEffect(() => {
    console.log(dummyData);
  }, [dummyData]);

  return (
    <>
      <EventTable eventsRowList={dummyData} />
    </>
  );
}
