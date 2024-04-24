export default function Form(functionName) {
  return (
    <form className="form-control m-2">
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
        name=""
        id=""
      />
      <button className="btn max-w-xs mt-2" onClick={functionName}>Lägg till</button>
    </form>
  );
}
