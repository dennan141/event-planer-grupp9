import React, { useState, useEffect } from "react";
import * as db from "@/Components/IndexedDb/Database.js";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [errors, setErrors] = useState({});
  const [existingEvent, setExistingEvent] = useState(null);
  const MAX_TITLE_LENGTH = 25;
  const MAX_DESCRIPTION_LENGTH = 200;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        db.get(parseInt(params.eventId)).then((eventData) => {
          setExistingEvent(eventData);
        });
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };
    console.log(pathname);
    if (pathname != "/add") {
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
      errors.title = `Titeln kan inte vara längre än ${MAX_TITLE_LENGTH} tecken`;
    }
    if (!newEventDescription.trim()) {
      errors.description = "Beskrivning är obligatorisk";
    } else if (newEventDescription.length > MAX_DESCRIPTION_LENGTH) {
      errors.description = `Beskrivningen kan inte vara längre än ${MAX_DESCRIPTION_LENGTH} tecken`;
    }
    if (!newEventDate) {
      errors.date = "Datum är obligatoriskt";
    } else if (new Date(newEventDate) < new Date()) {
      errors.date = "Datumet kan inte vara tidigare än idag";
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
          defaultValue={existingEvent ? existingEvent.title : ""}
          noValidate
        />
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
          noValidate
        />
        {errors.description && (
          <div className="error">{errors.description}</div>
        )}
      </div>
      {/* DATE TIME */}
      <div>
        <label className="label" htmlFor="Description">
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

      <button className="btn btn-primary mt-3">Lägg till</button>
    </form>
  );
}
