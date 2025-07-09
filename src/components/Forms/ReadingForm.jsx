import { useState } from 'react';
import { Activity } from 'lucide-react';
import getBPClassification from '../../utils/getBPClassification';

export const ReadingForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    systolic: '',
    diastolic: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.systolic || formData.systolic < 0 || formData.systolic > 300) {
      newErrors.systolic = 'Enter a valid systolic reading (0-300)';
    }
    
    if (!formData.diastolic || formData.diastolic < 0 || formData.diastolic > 200) {
      newErrors.diastolic = 'Enter a valid diastolic reading (0-200)';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic)
      });
      setFormData({
        date: new Date().toISOString().split('T')[0],
        time: new Date().toTimeString().slice(0, 5),
        systolic: '',
        diastolic: '',
        notes: ''
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const previewClassification = formData.systolic && formData.diastolic ? 
    getBPClassification(parseInt(formData.systolic), parseInt(formData.diastolic)) : null;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">Add New Reading</h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Time</label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.time ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Systolic (mmHg)</label>
            <input
              type="number"
              value={formData.systolic}
              onChange={(e) => handleChange('systolic', e.target.value)}
              placeholder="120"
              className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.systolic ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.systolic && <p className="text-red-500 text-sm mt-1">{errors.systolic}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Diastolic (mmHg)</label>
            <input
              type="number"
              value={formData.diastolic}
              onChange={(e) => handleChange('diastolic', e.target.value)}
              placeholder="80"
              className={`text-black w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.diastolic ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.diastolic && <p className="text-red-500 text-sm mt-1">{errors.diastolic}</p>}
          </div>
        </div>

        {previewClassification && (
          <div className={`text-black p-3 rounded-md ${previewClassification.bgColor}`}>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span className="font-medium">Classification:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${previewClassification.color}`}>
                {previewClassification.category}
              </span>
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Notes (optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            placeholder="After exercise, medication taken, etc."
            rows={3}
            className="text-black w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Reading
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingForm;