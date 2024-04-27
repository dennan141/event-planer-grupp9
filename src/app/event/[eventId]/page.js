"use client";
import React, { useEffect, useState } from "react";
import { get, set } from "../../../Components/IndexedDb/Database";
import EditEvent from "@/Components/Edit/EditEvent";
import DeleteButton from "../../../Components/DeleteEvent/DeleteEvent";

export default function EventViewPage({ params }) {
  const [foundEvent, setFoundEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchEventData() {
      try {
        const eventData = await get(parseInt(params.eventId));
        setFoundEvent(eventData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, [params.eventId]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async (updatedEventData) => {
    try {
      await set(updatedEventData);
      setIsEditing(false);
      console.log("Senast uppdaterade event sparad:", updatedEventData);
      console.log("Uppdatering lyckades!");
    } catch (error) {
      console.error("Uppdatering misslyckades:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto">
        {foundEvent ? (
          <div className="card w-96 bg-base-300 mx-auto text-base-content">
            <div className="card-body">
              <h2 className="card-title text-xl font-semibold mb-4">
                {foundEvent.title}
              </h2>
              <div className="text-sm mb-2">
                <span className="font-semibold primary">Beskrivning:</span>{" "}
                {foundEvent.description}
              </div>
              <div className="text-sm mb-2">
                <span className="font-semibold">Datum & Tid:</span>{" "}
                {foundEvent.date}
              </div>
              <div className="card-actions justify-around mt-4">
                <DeleteButton eventId={foundEvent.id} />
                {!isEditing ? (
                  <>
                    <button
                      className="btn btn-info text-primary-content ml-4"
                      onClick={handleEditClick}
                    >
                      Redigera
                    </button>
                  </>
                ) : (
                  <EditEvent
                    event={foundEvent}
                    onCancel={handleCancelEdit}
                    onSave={handleSaveEdit}
                  />
                )}
                {isEditing && (
                  <button
                    className="btn btn-third"
                    onClick={handleCancelEdit}
                  >
                    Avbryt
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="loading loading-spinner loading-lg text-primary my-auto mx-auto flex justify-center"></div>
        )}
      </div>
    </>
  );
}
