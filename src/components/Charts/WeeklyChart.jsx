import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const WeeklyChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">Week of {data.weekLabel}</p>
          <p className="text-sm text-gray-600">{data.readingCount} reading{data.readingCount > 1 ? 's' : ''}</p>
          <div className="flex gap-4 mt-2">
            <p className="text-sm">
              <span className="font-medium text-red-600">Avg Systolic:</span> {data.avgSystolic} mmHg
            </p>
            <p className="text-sm">
              <span className="font-medium text-blue-600">Avg Diastolic:</span> {data.avgDiastolic} mmHg
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center py-8">
          <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Weekly averages will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Weekly Averages</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="weekLabel" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="avgSystolic" 
              fill="#dc2626" 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
            <Bar 
              dataKey="avgDiastolic" 
              fill="#2563eb" 
              radius={[2, 2, 0, 0]}
              opacity={0.8}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="text-black">Avg Systolic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-black">Avg Diastolic</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;