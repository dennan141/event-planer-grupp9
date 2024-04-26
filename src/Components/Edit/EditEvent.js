import React, { useState, useEffect } from 'react';
import Form from '../Form/Form';
import { set } from '../IndexedDb/Database';

export default function EditEvent({ event, onCancel, onSave }) {
  const [formData, setFormData] = useState({ ...event });

  useEffect(() => {
    setFormData({ ...event });
  }, [event]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("save this:", { ...formData, id: event.id });
      await set({ ...formData, id: event.id });
      onSave({ ...formData, id: event.id });
    } catch (error) {
      console.error("no bueno updato:", error);
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <Form
        formData={formData}
        onChange={handleFormChange} 
        onSubmit={handleFormSubmit}
        onCancel={onCancel}
      />
    </div>
  );
}
