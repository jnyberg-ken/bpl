import generateReport from './generateReport';

export const exportReport = (readings, stats) => {
  const report = generateReport(readings, stats);
  const blob = new Blob([report], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bp_report_${new Date().toISOString().split('T')[0]}.txt`;
  link.click();
  window.URL.revokeObjectURL(url);
};

export default exportReport;