"use client";
import * as db from "@/Components/IndexedDb/Database.js";
import { useRouter, usePathname, useParams } from "next/navigation";

export default function Form() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  // * ----------- ADD --------------
  const handleSubmit = (event) => {
    event.preventDefault();

    const newEventTitle = event.target.Title.value;
    const newEventDescription = event.target.Description.value;
    const newEventDate = event.target.Date.value;

    let newEvent = {
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate,
    };
    if (pathname === "/add") {
      db.set(newEvent);
    } else {
      db.get(parseInt(params.eventId)).then((foundEvent) => {
        console.log("Hittad: " + foundEvent);
        foundEvent.date = newEvent.date;
        foundEvent.title = newEvent.title;
        foundEvent.description = newEvent.description;

        db.set(foundEvent);
        
        // spara den uppdaterade event:en sessionstorage
        sessionStorage.setItem('lastUpdatedEvent', JSON.stringify(foundEvent));
      });
    }
    router.push("/");
  };

  //TODO: #15 Consider implementing this for further validation.
  const handleChange = () => {};

  // * --------- RENDER PAGE ---------
  return (
    <form onSubmit={handleSubmit} className="form-control justify-center items-center">
      {/* TITLE */}
      <div>
        <label className="label" htmlFor="Title">
          Titel
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="text"
          name="Title"
          placeholder="Skriv din titel här..."
          required
        />
      </div>
      {/* DESCRIPTION */}
      <div>
        <label className="label" htmlFor="Description">
          Beskrivning
        </label>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full max-w-xs"
          type="text-area"
          name="Description"
          placeholder="Skriv din beskrivning här..."
          required
        />
      </div>
      {/* DATE TIME */}
      <div>
        <label className="label" htmlFor="Description">
          Datum
        </label>
        <input
          className="input input-bordered w-full max-w-xs"
          type="datetime-local"
          name="Date"
          required
        />
      </div>

      <button className="btn btn-primary max-w-xs mt-2">Lägg till</button>
    </form>
  );
}