import { useState } from 'react';
import { Plus } from 'lucide-react';
import useReadings from '../hooks/useReadings'
import useStatistics from '../hooks/useStatistics';
import useChartData from '../hooks/useChartData';
import ExportButton from './Forms/ExportButton';
import ReadingsList from './Lists/ReadingList';
import DashboardView from './Dashboard/DashboardView';
import TrendChart from './Charts/TrendChart';
import WeeklyChart from './Charts/WeeklyChart';
import ReadingForm from './Forms/ReadingForm';
import Navigation from './Navigation/Navigation';

const BloodPressureLog = () => {
  const { readings, addReading, updateReading, deleteReading } = useReadings();
  const { chartData, weeklyData } = useChartData(readings);
  const stats = useStatistics(readings);
  const [showForm, setShowForm] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  const handleAddReading = (reading) => {
    addReading(reading);
    setShowForm(false);
  };

  const renderContent = () => {
    if (showForm) {
      return (
        <ReadingForm 
          onSubmit={handleAddReading}
          onCancel={() => setShowForm(false)}
        />
      );
    }

    switch (activeView) {
      case 'dashboard':
        return <DashboardView stats={stats} readings={readings} onDelete={deleteReading} />;
      case 'trends':
        return <TrendChart data={chartData} />;
      case 'weekly':
        return <WeeklyChart data={weeklyData} />;
      default:
        return <ReadingsList readings={readings} onDelete={deleteReading} onEdit={updateReading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-900">Blood Pressure Log</h1>
            <p className="text-gray-600">Track your daily readings and trends</p>
          
            <div className="flex gap-2 mt-3">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Reading
                </button>
              )}
              {readings.length > 0 && !showForm && (
                <ExportButton readings={readings} stats={stats} />
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        {!showForm && <Navigation activeView={activeView} setActiveView={setActiveView} />}

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default BloodPressureLog;