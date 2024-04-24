"use client";
import Image from "next/image";
import "/tailwind.css";
import EventTable from "@/Components/Events/EventsTable";
import EventRow from "@/Components/Events/EventsRow";
import Data from "@/Components/DummyData/Data";
import { useEffect, useState } from "react";

export default function Home() {
  const [dummyData, setDummyData] = useState([]);
  const [listOfEventRows, setListOfEventRows] = useState()

  useEffect(() => {
    setDummyData(Data);
  }, []);

  useEffect(() => {
    const list = dummyData.map((event) => (
      <EventRow event={event} />
    ));
    console.log(dummyData)
    setListOfEventRows(list)
  }, [dummyData]);



  
  return (
    <>

      <EventTable
        eventsRowList = {dummyData}
      />
    </>
  );
}
