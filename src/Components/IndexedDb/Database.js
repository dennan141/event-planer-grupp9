import { openDB } from "idb";

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

// GET all keys from the database
export async function keys() {
  const db = await createDatabase();
  return db.getAllKeys("events");
}

export default createDatabase;
