"use client";
import React, { useEffect, useState } from "react";
import { get, set } from "../../../Components/IndexedDb/Database";
import EditEvent from "@/Components/Edit/EditEvent";
import DeleteButton from "../../../Components/DeleteEvent/DeleteEvent";

export default function EventViewPage({ params }) {
  const [foundEvent, setFoundEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null); // För att hålla reda på ändringar i redigerade evenemanget

  useEffect(() => {
    async function fetchEventData() {
      try {
        const eventData = await get(parseInt(params.eventId));
        setFoundEvent(eventData);
        setEditedEvent(eventData); // Sätt även editedEvent när du hämtar evenemangsdetaljer
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

  const handleSaveEdit = async () => {
    try {
      await set(editedEvent); // Använd editedEvent när du sparar ändringar
      setIsEditing(false);
      console.log("Senast uppdaterade event sparad:", editedEvent);
      console.log("Uppdatering lyckades!");
    } catch (error) {
      console.error("Uppdatering misslyckades:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Uppdatera editedEvent med de ändringar som gjorts i formuläret
    setEditedEvent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <>
      {foundEvent ? (
        <div className="card w-96 bg-accent  text-primary-content">
          <div className="card-body">
            {!isEditing ? (
              <>
                <h2 className="card-title text-xl font-semibold mb-4">{foundEvent.title}</h2>
                <div className="text-sm mb-2"><span className="font-semibold">Beskrivning:</span> {foundEvent.description}</div>
                <div className="text-sm mb-2"><span className="font-semibold">Datum & Tid:</span> {foundEvent.date}</div>
              </>
            ) : (
              <EditEvent
                event={editedEvent}
                onChange={handleChange} // Lägg till onChange för att uppdatera editedEvent
                onCancel={handleCancelEdit}
                onSave={handleSaveEdit}
              />
            )}
            <div className="card-actions justify-around mt-4">
              <DeleteButton eventId={foundEvent.id} />
              {!isEditing && (
                <button className="btn btn-third ml-4" onClick={handleEditClick}>Redigera</button>
              )}
              {isEditing && (
                <button className="btn btn-third ml-4" onClick={handleCancelEdit}>Avbryt</button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
