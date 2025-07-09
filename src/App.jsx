import BloodPressureLog from './components/BloodPressureLog';
import './App.css'
import generateBloodPressureData from './testing/generateBloodPressureData';

const generateData = true

generateData && generateBloodPressureData({
  startDate:'2025-07-01',
    endDate:'2025-07-09',
    numEntries:25,
    systolicMin:110,
    systolicMax:150,
    diastolicMin:80,
    diastolicMax:100
})
function App() {
  return (
    <>
      <BloodPressureLog/>
    </>
  )
}

export default App
