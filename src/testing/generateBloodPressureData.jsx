export function generateBloodPressureData(options = {}) {
  const {
    startDate = '2025-06-04',
    endDate = '2025-07-04',
    numEntries = 100,
    systolicMin = 90,
    systolicMax = 180,
    diastolicMin = 50,
    diastolicMax = 110
  } = options;
  
  const data = [];
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  
  const notes = [
    "morning reading", "after coffee", "before workout", "after exercise", 
    "before bed", "feeling stressed", "relaxed at home", "after meditation", 
    "post-meal", "just woke up", "end of workday", "weekend morning", 
    "after walk", "before medication", "after medication", "feeling tired", 
    "normal check", "routine reading", "doctor's request", "weekly check", ""
  ];
  
  const systolicRange = systolicMax - systolicMin;
  const diastolicRange = diastolicMax - diastolicMin;
  const baseSystolic = systolicMin + (systolicRange * 0.4);
  const baseDiastolic = diastolicMin + (diastolicRange * 0.4);
  
  for (let i = 0; i < numEntries; i++) {
    const randomTime = startDateObj.getTime() + Math.random() * (endDateObj.getTime() - startDateObj.getTime());
    const readingDate = new Date(randomTime);
    const hour = readingDate.getHours();
    
    let adjustedSystolic = baseSystolic;
    let adjustedDiastolic = baseDiastolic;
    
    if (hour >= 6 && hour <= 10) {
      adjustedSystolic += (systolicRange * 0.1) * (Math.random() - 0.2);
      adjustedDiastolic += (diastolicRange * 0.1) * (Math.random() - 0.2);
    } else if (hour >= 14 && hour <= 18) {
      adjustedSystolic += (systolicRange * 0.08) * (Math.random() - 0.5);
      adjustedDiastolic += (diastolicRange * 0.08) * (Math.random() - 0.5);
    } else {
      adjustedSystolic += (systolicRange * 0.12) * (Math.random() - 0.7);
      adjustedDiastolic += (diastolicRange * 0.12) * (Math.random() - 0.7);
    }
    
    const systolicVariation = (systolicRange * 0.3) * (Math.random() - 0.5);
    const diastolicVariation = (diastolicRange * 0.3) * (Math.random() - 0.5);
    
    let systolic = Math.round(adjustedSystolic + systolicVariation);
    let diastolic = Math.round(adjustedDiastolic + diastolicVariation);
    
    systolic = Math.max(systolicMin, Math.min(systolicMax, systolic));
    diastolic = Math.max(diastolicMin, Math.min(diastolicMax, diastolic));
    
    const finalDiastolic = Math.min(diastolic, systolic - 15);
    const dateStr = readingDate.toISOString().split('T')[0];
    const timeStr = readingDate.toTimeString().slice(0, 5);
    
    data.push({
      createdAt: readingDate.toISOString(),
      date: dateStr,
      diastolic: finalDiastolic,
      id: readingDate.getTime().toString(),
      notes: notes[Math.floor(Math.random() * notes.length)],
      systolic: systolic,
      time: timeStr
    });
  }
  
  data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  localStorage.setItem('bp-readings', JSON.stringify(data));
  
  return data;
}

export default generateBloodPressureData;