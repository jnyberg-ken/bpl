import { TrendingUp } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export const TrendChart = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.fullDate}</p>
          <p className="text-sm text-gray-600">{data.time}</p>
          <div className="flex gap-4 mt-2">
            <p className="text-sm">
              <span className="font-medium text-red-600">Systolic:</span> {data.systolic} mmHg
            </p>
            <p className="text-sm">
              <span className="font-medium text-blue-600">Diastolic:</span> {data.diastolic} mmHg
            </p>
          </div>
          {data.notes && (
            <p className="text-sm text-gray-500 mt-1 italic">{data.notes}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Add more readings to see trends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Blood Pressure Trends</h3>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="shortDate" 
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
            <Line 
              type="monotone" 
              dataKey="systolic" 
              stroke="#dc2626" 
              strokeWidth={2}
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#dc2626', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="diastolic" 
              stroke="#2563eb" 
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-600 rounded-full"></div>
          <span className="text-black">Systolic</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
          <span className="text-black">Diastolic</span>
        </div>
      </div>
    </div>
  );
};

export default TrendChart;