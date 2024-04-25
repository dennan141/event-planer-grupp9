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
    if (!pathname === "/add") {
      newEvent = {
        title: newEventTitle,
        description: newEventDescription,
        date: newEventDate,
        id: params,
      };
    }
    db.set(newEvent);
    router.push("/");
  };

  //TODO: #15 Consider implementing this for further validation.
  const handleChange = () => {};

  // * --------- RENDER PAGE ---------
  return (
    <form onSubmit={handleSubmit} className="form-control m-2">
      {/* TITLE */}
      <div>
        <label className="label" htmlFor="Title">
          Titel
        </label>
        <input
          className="input input-md bg-secondary shadow w-full max-w-xs"
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
          className="input input-lg bg-secondary shadow w-full max-w-xs"
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
          className="input  bg-secondary shadow w-full max-w-xs"
          type="datetime-local"
          name="Date"
          required
        />
      </div>

      <button className="btn max-w-xs mt-2">Lägg till</button>
    </form>
  );
}
