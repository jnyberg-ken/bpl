import { useState, useMemo } from 'react';
import { Search, Activity, Filter } from 'lucide-react';
import ReadingCard from '../Cards/ReadingCard';
import getBPClassification from '../../utils/getBPClassification';


export const ReadingsList = ({ readings, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredReadings = useMemo(() => {
    let filtered = readings;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(reading => 
        reading.notes?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reading.date.includes(searchTerm) ||
        `${reading.systolic}/${reading.diastolic}`.includes(searchTerm)
      );
    }

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter(reading => {
        const classification = getBPClassification(reading.systolic, reading.diastolic);
        return classification.category === filterCategory;
      });
    }

    // Sort
    if (sortBy === 'oldest') {
      filtered = [...filtered].reverse();
    } else if (sortBy === 'systolic-high') {
      filtered = [...filtered].sort((a, b) => b.systolic - a.systolic);
    } else if (sortBy === 'systolic-low') {
      filtered = [...filtered].sort((a, b) => a.systolic - b.systolic);
    }

    return filtered;
  }, [readings, searchTerm, filterCategory, sortBy]);

  if (readings.length === 0) {
    return (
      <div className="text-center py-12">
        <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No readings yet</h3>
        <p className="text-gray-500">Add your first blood pressure reading to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Readings</h2>
        <span className="text-sm text-gray-500">{filteredReadings.length} of {readings.length}</span>
      </div>

      {/* Search and Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by notes, date, or reading..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-black flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Normal">Normal</option>
            <option value="Elevated">Elevated</option>
            <option value="High Stage 1">High Stage 1</option>
            <option value="High Stage 2">High Stage 2</option>
            <option value="Crisis">Crisis</option>
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-black flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="systolic-high">Highest Systolic</option>
            <option value="systolic-low">Lowest Systolic</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-4">
        {filteredReadings.map(reading => (
          <ReadingCard 
            key={reading.id} 
            reading={reading} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {filteredReadings.length === 0 && readings.length > 0 && (
        <div className="text-center py-8">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No readings match your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ReadingsList;