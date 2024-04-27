import Link from "next/link";
import { deleteEvent } from "@/Components/IndexedDb/Database";

export default function DeleteButton({ eventId, onSuccess, onError }) {

  const handleDeleteClick = async () => {
    try {
      await deleteEvent(eventId);
      if (onSuccess) onSuccess();
      sessionStorage.clear();
    } catch (error) {
      console.error("Error deleting event:", error);
      if (onError) onError(error);
    }
  };

  return (
    <Link href="/" passHref>
      <button className="btn btn-active" onClick={handleDeleteClick}>Ta bort</button>
    </Link>
  );
}
