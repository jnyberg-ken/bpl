import { Activity, Target, AlertTriangle, CheckCircle } from "lucide-react";

export const HealthInsights = ({ stats }) => {
  if (!stats) return null;

  const insights = [];

  if (stats.trends.systolic === 'decreasing' && stats.trends.diastolic === 'decreasing') {
    insights.push({
      type: 'positive',
      icon: CheckCircle,
      title: 'Great Progress!',
      message: 'Both systolic and diastolic readings are trending downward over the past month.'
    });
  } else if (stats.trends.systolic === 'increasing' || stats.trends.diastolic === 'increasing') {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      title: 'Monitor Closely',
      message: 'Your blood pressure has been trending upward. Consider consulting your healthcare provider.'
    });
  }

  if (stats.readingsLast7Days < 3) {
    insights.push({
      type: 'info',
      icon: Target,
      title: 'Consistency Tip',
      message: 'Try to take readings more regularly. Daily measurements provide better trend data.'
    });
  }

  const normalCount = stats.classifications['Normal'] || 0;
  const totalRecent = stats.readingsLast30Days;
  if (totalRecent > 0 && (normalCount / totalRecent) > 0.8) {
    insights.push({
      type: 'positive',
      icon: CheckCircle,
      title: 'Excellent Control',
      message: 'Most of your recent readings are in the normal range. Keep up the good work!'
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5 text-purple-600" />
        Health Insights
      </h3>
      
      {insights.length === 0 ? (
        <p className="text-gray-500 italic">Add more readings to get personalized insights.</p>
      ) : (
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const colors = {
              positive: 'text-green-600 bg-green-50',
              warning: 'text-orange-600 bg-orange-50',
              info: 'text-blue-600 bg-blue-50'
            };
            
            return (
              <div key={index} className="flex gap-3">
                <div className={`p-2 rounded-lg ${colors[insight.type]}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{insight.title}</p>
                  <p className="text-sm text-gray-600">{insight.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HealthInsights;