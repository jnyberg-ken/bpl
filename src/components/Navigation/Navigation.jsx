import { LayoutDashboard, Activity, TrendingUp, BarChart3 } from "lucide-react";

export const Navigation = ({ activeView, setActiveView }) => {
  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'readings', label: 'Readings', icon: Activity },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'weekly', label: 'Weekly', icon: BarChart3 }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border p-1 mb-6">
      <div className="flex flex-wrap">
        {views.map(view => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`max-w-[48%] m-1 flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeView === view.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {view.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;