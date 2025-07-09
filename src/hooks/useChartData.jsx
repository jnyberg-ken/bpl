import { useMemo } from "react";

export const useChartData = (readings) => {
  const chartData = useMemo(() => {
    const sorted = [...readings].sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
    
    return sorted.map((reading, index) => ({
      id: reading.id,
      index: index + 1,
      date: reading.date,
      time: reading.time,
      systolic: reading.systolic,
      diastolic: reading.diastolic,
      dateTime: new Date(reading.date + ' ' + reading.time),
      shortDate: new Date(reading.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone:'UTC' }),
      fullDate: new Date(reading.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone:'UTC' }),
      notes: reading.notes
    }));
  }, [readings]);

  const weeklyData = useMemo(() => {
    if (readings.length === 0) return [];
    
    const weeklyMap = new Map();
    
    readings.forEach(reading => {
      const date = new Date(reading.date);
      const weekStart = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const weekKey = weekStart.toISOString().split('T')[0];
      
      if (!weeklyMap.has(weekKey)) {
        weeklyMap.set(weekKey, {
          weekStart: weekKey,
          weekLabel: weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone:'UTC' }),
          systolicReadings: [],
          diastolicReadings: []
        });
      }
      
      weeklyMap.get(weekKey).systolicReadings.push(reading.systolic);
      weeklyMap.get(weekKey).diastolicReadings.push(reading.diastolic);
    });
    
    return Array.from(weeklyMap.values()).map(week => ({
      ...week,
      avgSystolic: Math.round(week.systolicReadings.reduce((a, b) => a + b, 0) / week.systolicReadings.length),
      avgDiastolic: Math.round(week.diastolicReadings.reduce((a, b) => a + b, 0) / week.diastolicReadings.length),
      readingCount: week.systolicReadings.length
    })).sort((a, b) => new Date(a.weekStart) - new Date(b.weekStart));
  }, [readings]);

  return { chartData, weeklyData };
};

export default useChartData;