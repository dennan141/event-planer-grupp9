import * as db  from '@/Components/IndexedDb/Database'
import DummyData from "@/Components/DummyData/Data.json";

export default function PopulateDatabase() {
  DummyData.forEach((dummyEvent) => {
    db.createDatabase()
    db.set(dummyEvent);
  });
}
