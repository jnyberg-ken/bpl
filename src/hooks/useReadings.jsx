import { useState } from "react";

export const useReadings = () => {
  const [readings, setReadings] = useState(() => {
    const saved = localStorage.getItem('bp-readings');
    return saved ? JSON.parse(saved) : [];
  });

  const addReading = (reading) => {
    const newReading = {
      id: Date.now().toString(),
      ...reading,
      createdAt: new Date().toISOString()
    };
    const updated = [newReading, ...readings];
    setReadings(updated);
    localStorage.setItem('bp-readings', JSON.stringify(updated));
  };

  const updateReading = (id, updatedReading) => {
    const updated = readings.map(r => 
      r.id === id ? { ...r, ...updatedReading } : r
    );
    setReadings(updated);
    localStorage.setItem('bp-readings', JSON.stringify(updated));
  };

  const deleteReading = (id) => {
    const updated = readings.filter(r => r.id !== id);
    setReadings(updated);
    localStorage.setItem('bp-readings', JSON.stringify(updated));
  };

  return { readings, addReading, updateReading, deleteReading };
};

export default useReadings;