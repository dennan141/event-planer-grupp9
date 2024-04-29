export default function Search(eventsList, searchQuery) {
    const filteredList = []
    eventsList.forEach(event => {
        if(event.title.includes(searchQuery)){
            filteredList.push(event)
        }
    });
    return filteredList
}
