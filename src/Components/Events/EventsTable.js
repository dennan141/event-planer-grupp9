import Link from "next/link";

export default function EventTable({ eventsRowList }) {
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
            <Link key={event.id} href={`event/${event.id}`} passHref>
              <tr className="hover">
                <th>{event.id}</th>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.description}</td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
    </div>
  );
}
