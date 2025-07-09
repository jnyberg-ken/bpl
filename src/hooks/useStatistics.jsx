import { useMemo } from "react";
import getBPClassification from "../utils/getBPClassification";

export const useStatistics = (readings) => {
  const stats = useMemo(() => {
    if (readings.length === 0) return null;

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const recent7Days = readings.filter(r => new Date(r.date) >= sevenDaysAgo);
    const recent30Days = readings.filter(r => new Date(r.date) >= thirtyDaysAgo);

    const calculateAverage = (data, field) => {
      if (data.length === 0) return 0;
      return Math.round(data.reduce((sum, reading) => sum + reading[field], 0) / data.length);
    };

    const avg7DaysSystolic = calculateAverage(recent7Days, 'systolic');
    const avg7DaysDiastolic = calculateAverage(recent7Days, 'diastolic');
    const avg30DaysSystolic = calculateAverage(recent30Days, 'systolic');
    const avg30DaysDiastolic = calculateAverage(recent30Days, 'diastolic');

    const calculateTrend = (data, field) => {
      if (data.length < 4) return 'stable';
      const sorted = [...data].sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
      const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
      const secondHalf = sorted.slice(Math.floor(sorted.length / 2));
      
      const firstAvg = calculateAverage(firstHalf, field);
      const secondAvg = calculateAverage(secondHalf, field);
      
      const difference = secondAvg - firstAvg;
      if (Math.abs(difference) < 3) return 'stable';
      return difference > 0 ? 'increasing' : 'decreasing';
    };

    const systolicTrend = calculateTrend(recent30Days, 'systolic');
    const diastolicTrend = calculateTrend(recent30Days, 'diastolic');

    const classifications = readings.map(r => getBPClassification(r.systolic, r.diastolic).category);
    const classificationCounts = classifications.reduce((acc, cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {});

    const latestReading = readings[0];
    const latestClassification = getBPClassification(latestReading.systolic, latestReading.diastolic);

    return {
      totalReadings: readings.length,
      avg7Days: { systolic: avg7DaysSystolic, diastolic: avg7DaysDiastolic },
      avg30Days: { systolic: avg30DaysSystolic, diastolic: avg30DaysDiastolic },
      trends: { systolic: systolicTrend, diastolic: diastolicTrend },
      classifications: classificationCounts,
      latestReading,
      latestClassification,
      readingsLast7Days: recent7Days.length,
      readingsLast30Days: recent30Days.length
    };
  }, [readings]);

  return stats;
};

export default useStatistics;