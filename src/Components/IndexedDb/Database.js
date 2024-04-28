import { openDB } from "idb";

//TODO: #12 Consider changing to loading the dummy data in createDatabase -> if
export async function createDatabase() {
  //Using params name, version and functions ?
  const dbPromise = await openDB("myDatabase", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
  return dbPromise;
}

// GET a value by key from the database
export async function get(key) {
  const db = await createDatabase();
  return db.get("events", key);
}

// SET a value with a key in the database
export async function set(val) {
  const db = await createDatabase();
  return db.put("events", val);
}

export async function updateEvent(val, key) {
  const db = await createDatabase();
  return db.put("events", val, key);
}
// GET all keys from the database
export async function keys() {
  const db = await createDatabase();
  return db.getAllKeys("events");
}
// REMOVE a value with a key in the databse
export async function deleteEvent(key) {
  const db = await createDatabase();
  return db.delete("events", key);
}
export async function getAllEvents() {
  const db = await createDatabase();
  const allKeys = await db.getAllKeys("events");

  const allEvents = [];

  for (const key of allKeys) {
    const event = await db.get("events", key);
    allEvents.push(event);
  }
  return allEvents;
}

export default createDatabase;
