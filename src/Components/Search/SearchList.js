export default function Search({
  eventsList,
  searchQuery,
  setSortedEventsList,
}) {
  setSortedEventsList(
    eventsList.filter((event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
}
