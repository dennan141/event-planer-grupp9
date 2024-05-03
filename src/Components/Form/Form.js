import React, { useState, useEffect } from "react";
import * as db from "@/Components/IndexedDb/Database.js";
import { useRouter, usePathname, useParams } from "next/navigation";
import { lazy } from "react";
import { Suspense } from "react";

const LazyLengthValidation = lazy(() => import("../LengthValidation/LengthValidation"));

export default function Form() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [existingEvent, setExistingEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const MAX_TITLE_LENGTH = 25;
  const MAX_DESCRIPTION_LENGTH = 100;
  const [buttonMessage, setButtonMessage] = useState("Lägg till");
  
  
  

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        db.get(parseInt(params.eventId)).then((eventData) => {
          setExistingEvent(eventData);
          setTitle(eventData.title);
          
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    if (pathname != "/add") {
      setButtonMessage("Redigera event");
      fetchEvent();
    }
  }, [params.eventId]);

  // * ----------- ADD --------------
  const handleSubmit = (event) => {
    event.preventDefault();

    const newEventTitle = event.target.Title.value;
    const newEventDescription = event.target.Description.value;
    const newEventDate = event.target.Date.value;

    const errors = {};
    if (!newEventTitle.trim()) {
      errors.title = "Titel är obligatorisk";
    } else if (newEventTitle.length > MAX_TITLE_LENGTH) {
      errors.title = ``;
    }
    if (!newEventDescription.trim()) {
      errors.description = "Beskrivning är obligatorisk";
    } else if (newEventDescription.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = ``;
    }
    if (!newEventDate) {
      errors.date = "Datum är obligatoriskt";
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(newEventDate);
      if (pathname === "/add" && selectedDate < currentDate) {
        errors.date = "Datumet kan inte vara tidigare än idag";
      }
    }

    if (Object.keys(errors).length === 0) {
      const newEvent = {
        title: newEventTitle,
        description: newEventDescription,
        date: newEventDate,
      };

      //TODO: #27 Improve performance of this nested async hell
      if (pathname === "/add") {
        db.set(newEvent).then(() => {
          db.keys().then((allDbKeys) => {
            const latestActivityId = allDbKeys[allDbKeys.length - 1];
            db.get(latestActivityId).then((foundEvent) => {
              sessionStorage.setItem(
                "latestActivity",
                JSON.stringify(foundEvent)
              );
            });
          });
        });
      } else {
        db.get(parseInt(params.eventId)).then((foundEvent) => {
          foundEvent.date = newEvent.date;
          foundEvent.title = newEvent.title;
          foundEvent.description = newEvent.description;

          db.set(foundEvent);
          sessionStorage.setItem("latestActivity", JSON.stringify(foundEvent));
        });
      }
      router.push("/");
    } else {
      setErrors(errors);
    }
  };

  // * --------- RENDER PAGE ---------
  return (
    <form
      onSubmit={handleSubmit}
      className="grid justify-center items-center"
      noValidate
    >
      {/* TITLE */}
      <div>
        <label className="label" htmlFor="Title">
          Titel
        </label>
        <input
          className="input flex bg-neutral shadow w-full max-w-md"
          type="text"
          name="Title"
          placeholder="Skriv din titel här..."
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          noValidate
        />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyLengthValidation maxLength={MAX_TITLE_LENGTH} value={title} />
        </Suspense>
        {errors.title && <div className="error">{errors.title}</div>}
        
      </div>
      {/* DESCRIPTION */}
      <div>
        <label className="label" htmlFor="Description">
          Beskrivning
        </label>
        <textarea
          className="textarea textarea-lg bg-neutral shadow max-w-md flex"
          type="text-area"
          name="Description"
          placeholder="Skriv din beskrivning här..."
          required
          defaultValue={existingEvent ? existingEvent.description : ""} 
          onChange={(e) => setDescription(e.target.value)}
          noValidate
        />
        <Suspense fallback={<div>Loading...</div>}>
          <LazyLengthValidation maxLength={MAX_DESCRIPTION_LENGTH} value={description} />
        </Suspense>
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
      </div>
      {/* DATE TIME */}
      <div>
        <label className="label" htmlFor="Date">
          Datum
        </label>
        <input
          className="input bg-neutral shadow w-full max-w-md"
          type="datetime-local"
          name="Date"
          min={new Date().toISOString().split("T")[0]}
          defaultValue={existingEvent ? existingEvent.date : ""}
        />
        {errors.date && <div className="error">{errors.date}</div>}
      </div>

      <button className="btn btn-primary mt-3">{buttonMessage}</button>
    </form>
  );
}
