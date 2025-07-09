import { Clock } from "lucide-react";
import getBPClassification from "../../utils/getBPClassification";

export const RecentReadings = ({ readings, onDelete }) => {
  const recentReadings = readings.slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="w-5 h-5 text-indigo-600" />
          Recent Readings
        </h3>
        <span className="text-sm text-gray-500">{readings.length} total</span>
      </div>
      
      {recentReadings.length === 0 ? (
        <p className="text-gray-500 italic">No readings yet. Add your first reading to get started.</p>
      ) : (
        <div className="space-y-3">
          {recentReadings.map(reading => {
            const classification = getBPClassification(reading.systolic, reading.diastolic);
            return (
              <div key={reading.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-lg font-semibold text-gray-900">
                    {reading.systolic}/{reading.diastolic}
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${classification.color}`}>
                    {classification.category}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {new Date(reading.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })}
                  </div>
                  <div className="text-xs text-gray-500">{reading.time}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentReadings;