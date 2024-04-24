import openDB from "idb";

async function createDatabase() {
  //Using params name, version and functions ?
  const db = await openDB("myDatabase", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("events")) {
        db.createObjectStore("events", {
          keyPath: "id",
          autoIncrement: true,
          title: "No Title",
          description: "No Description",
          date: "No Date"
        });
      }
    },
  });
  return db;
}

export async function get(key) {
  return (await db).get("testKeyBooks", key);
}

export async function set(key, val) {
  return (await dbPromise).put("keyval", val, key);
}

export async function keys() {
  return (await dbPromise).getAllKeys("keyval");
}

export default createDatabase;
