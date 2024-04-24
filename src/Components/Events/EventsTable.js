"use client";

export default function EventTable({ eventsRowList }) {
  /* Handle the click of an event row */
  const handleRowClick = (event) => {
    console.log(event)
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Titel</th>
            <th>Datum</th>
            <th>Beskrivning</th>
          </tr>
        </thead>
        <tbody>
          {eventsRowList.map((event) => (
            <tr
              key={event.id}
              className="hover"
              onClick={() => handleRowClick(event)}
            >
              <th>{event.id}</th>
              <td>{event.title}</td>
              <td>{event.date}</td>
              <td>{event.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

{
  /* <Link key={event.id} href={`event/${event.id}`} passHref></Link> */
}
