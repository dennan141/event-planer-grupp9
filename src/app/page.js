"use client";
import Image from "next/image";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import Data from "@/Components/DummyData/Data";
import { useEffect, useState } from "react";

export default function Home() {
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
