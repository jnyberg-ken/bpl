import getBPClassification from "./getBPClassification";

export const generateReport = (readings, stats) => { console.log("GENERATING", readings, stats)
  if (!stats) return '';

  const reportDate = new Date().toLocaleDateString();
  const dateRange = readings.length > 0 
    ? `${new Date(readings[readings.length - 1].date).toLocaleDateString()} - ${new Date(readings[0].date).toLocaleDateString()}`
    : 'No data';

  return `BLOOD PRESSURE REPORT
Generated: ${reportDate}
Period: ${dateRange}

SUMMARY
Total Readings: ${stats.totalReadings}
Latest Reading: ${stats.latestReading.systolic}/${stats.latestReading.diastolic} mmHg (${stats.latestClassification.category})

AVERAGES
7-Day Average: ${stats.avg7Days.systolic}/${stats.avg7Days.diastolic} mmHg
30-Day Average: ${stats.avg30Days.systolic}/${stats.avg30Days.diastolic} mmHg

TRENDS
Systolic: ${stats.trends.systolic}
Diastolic: ${stats.trends.diastolic}

CLASSIFICATION BREAKDOWN
${Object.entries(stats.classifications).map(([category, count]) => 
  `${category}: ${count} reading${count > 1 ? 's' : ''} (${Math.round(count / stats.totalReadings * 100)}%)`
).join('\n')}

RECENT READINGS
${readings.slice(0, 10).map(reading => {
  const classification = getBPClassification(reading.systolic, reading.diastolic);
  return `${reading.date} ${reading.time}: ${reading.systolic}/${reading.diastolic} mmHg (${classification.category})${reading.notes ? ` - ${reading.notes}` : ''}`;
}).join('\n')}

Note: This report is for informational purposes only. 
Please consult your healthcare provider for medical advice.`;
};

export default generateReport;