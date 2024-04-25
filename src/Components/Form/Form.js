"use client";
import * as db from "@/Components/IndexedDb/Database.js";

export default function Form() {
  const handleSubmit = (event) => {
    event.preventDefault();

    const newEventTitle = event.target.Title.value;
    const newEventDescription = event.target.Description.value;
    const newEventDate = event.target.Date.value;

    const newEvent = {
      title: newEventTitle,
      description: newEventDescription,
      date: newEventDate
    };
    //Add event to database
    db.set(newEvent);
    return<h1>hej</h1>
  };

  // * --------- RENDER PAGE ---------
  return (
    <form onSubmit={handleSubmit} className="form-control m-2">
      <label className="label" htmlFor="Title">
        Titel
      </label>
      <input
        className="input input-md bg-secondary shadow w-full max-w-xs"
        type="text"
        name="Title"
        id="Title"
      />

      <label className="label" htmlFor="Description">
        Beskrivning
      </label>
      <textarea
        className="input input-lg bg-secondary shadow w-full max-w-xs"
        type="text-area"
        name="Description"
      />

      <label className="label" htmlFor="Description">
        Datum
      </label>
      <input
        className="input  bg-secondary shadow w-full max-w-xs"
        type="datetime-local"
        name="Date"
      />
      <button className="btn max-w-xs mt-2">Lägg till</button>
    </form>
  );
}
