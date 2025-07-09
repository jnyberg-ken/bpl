export const getBPClassification = (systolic, diastolic) => {
  // Severe Hypotension (dangerously low)
  if (systolic < 70 || diastolic < 40) {
    return { category: 'Severe Hypotension', color: 'bg-purple-100 text-purple-800', bgColor: 'bg-purple-50' };
  }
  // Hypotension (low blood pressure)
  else if (systolic < 90 || diastolic < 60) {
    return { category: 'Hypotension', color: 'bg-blue-100 text-blue-800', bgColor: 'bg-blue-50' };
  }
  // Normal
  else if (systolic < 120 && diastolic < 80) {
    return { category: 'Normal', color: 'bg-green-100 text-green-800', bgColor: 'bg-green-50' };
  }
  // Elevated
  else if (systolic < 130 && diastolic < 80) {
    return { category: 'Elevated', color: 'bg-yellow-100 text-yellow-800', bgColor: 'bg-yellow-50' };
  }
  // High Stage 1
  else if (systolic < 140 || diastolic < 90) {
    return { category: 'High Stage 1', color: 'bg-orange-100 text-orange-800', bgColor: 'bg-orange-50' };
  }
  // High Stage 2
  else if (systolic < 180 || diastolic < 120) {
    return { category: 'High Stage 2', color: 'bg-red-100 text-red-800', bgColor: 'bg-red-50' };
  }
  // Hypertensive Crisis
  else {
    return { category: 'Hypertensive Crisis', color: 'bg-red-200 text-red-900', bgColor: 'bg-red-100' };
  }
};

export default getBPClassification