"use client";
import React, { useEffect, useState } from 'react';
import { get } from '../../../Components/IndexedDb/Database';
import EditEvent from '@/Components/Edit/EditEvent';
import DeleteButton from '../../../Components/DeleteEvent/DeleteEvent';

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
      console.log("Updated event data:", updatedEventData);
      await set(updatedEventData);
      setIsEditing(false);
      console.log("hurra uppdatering!");
    } catch (error) {
      console.error("error no update:", error);
    }
  };

  return (
    <>
      {foundEvent ? (
        <div className="card w-96 bg-primary  text-primary-content">
          <div className="card-body">
            <h2 className="card-title text-xl font-semibold mb-4">{foundEvent.title}</h2>
            <div className="text-sm mb-2"><span className="font-semibold">Beskrivning:</span> {foundEvent.description}</div>
            <div className="text-sm mb-2"><span className="font-semibold">Datum & Tid:</span> {foundEvent.date}</div>
            <div className="card-actions justify-around mt-4">
        <DeleteButton eventId={foundEvent.id} />
        {!isEditing ? (
          <button className="btn btn-third ml-4" onClick={handleEditClick}>Edit Event</button>
        ) : (
          <EditEvent event={foundEvent} onCancel={handleCancelEdit} onSave={handleSaveEdit} />
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
