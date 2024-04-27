"use client";
import Form from "@/Components/Form/Form";
export default function addPage() {
  return (
    <>
      <div className="container mx-auto mt-2">
        <h1 className="text-4xl mx-auto grid items-center justify-center">
          Skapa nytt event
        </h1>
        <Form />
      </div>
    </>
  );
}
