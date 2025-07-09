import { useState } from "react";
import { Download, FileText, Share2 } from "lucide-react";
import exportReport from "../../utils/exportReport";
import exportToCSV from "../../utils/exportToCSV";

export const ExportButton = ({ readings, stats }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShare = async () => {
    if (navigator.share && stats) {
      try {
        await navigator.share({
          title: 'Blood Pressure Log',
          text: `Latest BP: ${stats.latestReading.systolic}/${stats.latestReading.diastolic} mmHg (${stats.latestClassification.category})\n7-day avg: ${stats.avg7Days.systolic}/${stats.avg7Days.diastolic} mmHg`,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        <Download className="w-4 h-4" />
        Export
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
          <div className="py-1">
            <button
              onClick={() => {
                exportToCSV(readings, stats);
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4" />
              Download CSV
            </button>
            <button
              onClick={() => {
                exportReport(readings, stats);
                setShowDropdown(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-100"
            >
              <FileText className="w-4 h-4" />
              Download Report
            </button>
            {navigator.share && (
              <button
                onClick={() => {
                  handleShare();
                  setShowDropdown(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:bg-gray-100"
              >
                <Share2 className="w-4 h-4" />
                Share Summary
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButton;