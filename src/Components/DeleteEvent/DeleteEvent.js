import { deleteEvent } from "@/Components/IndexedDb/Database";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ eventId, onSuccess, onError }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDeleteClick = async () => {
    setLoading(true); // Set loading state to true when delete operation starts
    setErrorMessage(null); 

    try {
      await deleteEvent(eventId);
      if (onSuccess) onSuccess();
      sessionStorage.clear();
      router.push('/');
    } catch (error) {
      console.error("Error deleting event:", error);
      setErrorMessage("Något gick fel! Försök igen senare.");
      if (onError) onError(error);
    } finally {
      setLoading(false); // Set loading state to false when delete operation ends
    }
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button className="btn btn-error text-primary-content" onClick={() => router.push('/')}>Tillbaka till Startsidan</button>
        </div>
      )}
      {!loading && !errorMessage && (
        <button className="btn btn-error text-primary-content" tabIndex="0" onClick={handleDeleteClick}>
          Ta bort
        </button>
      )}
    </>
  );
}
