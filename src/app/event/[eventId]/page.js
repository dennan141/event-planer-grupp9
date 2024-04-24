"use client";
import { useEffect, useState } from "react";
import dummyData from "../../../Components/DummyData/Data";

export default function eventViewPage({ params }) {
  const foundEvent = dummyData.find((ev) => ev.id === parseInt(params.eventId));


  return foundEvent ? (
    <>


    
      <h2>event view page</h2>

      <div>{foundEvent.id}</div>
    </>
  ) : null;
}
