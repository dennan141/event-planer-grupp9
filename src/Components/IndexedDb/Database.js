import { openDB } from "idb";

export async function createDatabase() {
  //Using params name, version and functions ?
  const db = await openDB("myDatabase", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true
        });
      }
    },
  });
  return db;
}

export async function get(key) {
  return (await db).get("events", key);
}

export async function set(key, val) {
  return (await dbPromise).put("events", val, key);
}

export async function keys() {
  return (await dbPromise).getAllKeys("events");
}

export default createDatabase;
