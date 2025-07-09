import { useState } from "react";
import { Trash2, Calendar, Clock, Edit3 } from "lucide-react";
import getBPClassification from "../../utils/getBPClassification";

export const ReadingCard = ({ reading, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    date: reading.date,
    time: reading.time,
    systolic: reading.systolic,
    diastolic: reading.diastolic,
    notes: reading.notes || ''
  });

  const classification = getBPClassification(reading.systolic, reading.diastolic);
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      timeZone:'UTC'
    });
  };

  const handleSave = () => {
    onEdit(reading.id, {
      ...editData,
      systolic: parseInt(editData.systolic),
      diastolic: parseInt(editData.diastolic)
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="border rounded-lg p-4 bg-blue-50">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="date"
              value={editData.date}
              onChange={(e) => setEditData({...editData, date: e.target.value})}
              className="text-black px-2 py-1 border rounded text-sm"
            />
            <input
              type="time"
              value={editData.time}
              onChange={(e) => setEditData({...editData, time: e.target.value})}
              className="text-black px-2 py-1 border rounded text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={editData.systolic}
              onChange={(e) => setEditData({...editData, systolic: e.target.value})}
              className="text-black px-2 py-1 border rounded text-sm"
              placeholder="Systolic"
            />
            <input
              type="number"
              value={editData.diastolic}
              onChange={(e) => setEditData({...editData, diastolic: e.target.value})}
              className="text-black px-2 py-1 border rounded text-sm"
              placeholder="Diastolic"
            />
          </div>
          <textarea
            value={editData.notes}
            onChange={(e) => setEditData({...editData, notes: e.target.value})}
            className="text-black w-full px-2 py-1 border rounded text-sm"
            placeholder="Notes"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 bg-gray-300 text-gray-400 py-1 px-3 rounded text-sm hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`border rounded-lg p-4 ${classification.bgColor} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(reading.date)}</span>
          <Clock className="w-4 h-4 ml-2" />
          <span>{reading.time}</span>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(reading.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-2">
        <div className="text-2xl font-bold text-gray-900">
          {reading.systolic}/{reading.diastolic}
          <span className="text-sm font-normal text-gray-500 ml-1">mmHg</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${classification.color}`}>
          {classification.category}
        </span>
      </div>
      
      {reading.notes && (
        <p className="text-sm text-gray-600 mt-2">{reading.notes}</p>
      )}
    </div>
  );
};

export default ReadingCard;