export default function EventRow(event) {
  return (
    <tr className="hover">
      <th>{event.id}</th>
      <td>{event.title}</td>
      <td>{event.date}</td>
      <td>{event.description}</td>
    </tr>
  );
}
