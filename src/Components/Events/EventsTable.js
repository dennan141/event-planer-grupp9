"use client";

import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function EventTable({ eventsRowList }) {
  const router = useRouter();

  /* Handle the click of an event row */
  const handleRowClick = (event) => {
    // ? Handle event here

    //redirect(`/event/${event.id}`); // Navigate to view event page

    console.log(event);

    router.push(`/event/${event.id}`)
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
