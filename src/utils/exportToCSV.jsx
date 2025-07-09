import getBPClassification from './getBPClassification';

export const exportToCSV = (readings, stats) => {
    const headers = ['Date', 'Time', 'Systolic (mmHg)', 'Diastolic (mmHg)', 'Classification', 'Notes'];
    
    const csvData = readings.map(reading => {
      const classification = getBPClassification(reading.systolic, reading.diastolic);
      return [
        reading.date,
        reading.time,
        reading.systolic,
        reading.diastolic,
        classification.category,
        reading.notes || ''
      ];
    });
  
    // Add summary statistics at the top
    const summaryRows = stats ? [
      ['Blood Pressure Log Export'],
      ['Generated on:', new Date().toLocaleDateString()],
      [''],
      ['Summary Statistics:'],
      ['Total Readings:', stats.totalReadings],
      ['Latest Reading:', `${stats.latestReading.systolic}/${stats.latestReading.diastolic} (${stats.latestClassification.category})`],
      ['7-Day Average:', `${stats.avg7Days.systolic}/${stats.avg7Days.diastolic}`],
      ['30-Day Average:', `${stats.avg30Days.systolic}/${stats.avg30Days.diastolic}`],
      [''],
      headers
    ] : [headers];
  
    const allRows = [...summaryRows, ...csvData];
    
    const csvContent = allRows.map(row => 
      row.map(cell => `"${cell}"`).join(',')
    ).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `blood_pressure_log_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  export default exportToCSV;