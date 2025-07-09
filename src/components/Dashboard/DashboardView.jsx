import { Activity, Calendar, TrendingUp, BarChart3, LayoutDashboard } from "lucide-react";
import StatCard from "./StatCard";
import HealthInsights from "./HealthInsights";
import RecentReadings from "./RecentReadings";

export const DashboardView = ({ stats, readings, onDelete }) => {
  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
        <LayoutDashboard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Yet</h3>
        <p className="text-gray-500">Add some blood pressure readings to see your dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Latest Reading"
          value={`${stats.latestReading.systolic}/${stats.latestReading.diastolic}`}
          subtitle={stats.latestClassification.category}
          icon={Activity}
          color={stats.latestClassification.category === 'Normal' ? 'green' : stats.latestClassification.category === 'Elevated' ? 'orange' : 'red'}
        />
        <StatCard
          title="7-Day Average"
          value={`${stats.avg7Days.systolic}/${stats.avg7Days.diastolic}`}
          subtitle={`${stats.readingsLast7Days} readings`}
          trend={stats.trends.systolic}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="30-Day Average"
          value={`${stats.avg30Days.systolic}/${stats.avg30Days.diastolic}`}
          subtitle={`${stats.readingsLast30Days} readings`}
          trend={stats.trends.systolic}
          icon={TrendingUp}
          color="blue"
        />
        <StatCard
          title="Total Readings"
          value={stats.totalReadings}
          subtitle="All time"
          icon={BarChart3}
          color="green"
        />
      </div>

      {/* Insights and Recent Readings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HealthInsights stats={stats} />
        <RecentReadings readings={readings} onDelete={onDelete} />
      </div>
    </div>
  );
};

export default DashboardView;