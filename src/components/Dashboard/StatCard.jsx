import { TrendingDown, ArrowUp, ArrowDown } from "lucide-react";

export const StatCard = ({ title, value, subtitle, trend, icon: Icon, color = 'blue' }) => {
  const getTrendIcon = () => {
    if (trend === 'increasing') return <ArrowUp className="w-4 h-4 text-red-500" />;
    if (trend === 'decreasing') return <ArrowDown className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-gray-400 rotate-90" />;
  };

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && getTrendIcon()}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;