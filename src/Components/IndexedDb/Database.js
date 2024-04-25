import { openDB } from "idb";
import DummyData from '@/Components/DummyData/Data.json'


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
  /* Populate with dummy Data */
  DummyData.forEach(dummyEvent => {
    dbPromise.put("events", dummyEvent)
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

// GET all keys from the database
export async function keys() {
  const db = await createDatabase();
  return db.getAllKeys("events");
}

export default createDatabase;
