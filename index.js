// Function to create an employee record object based on the input array.
// The array must contain [firstName, familyName, title, payPerHour].
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [], // Array to store TimeIn events
      timeOutEvents: [] // Array to store TimeOut events
    }
  }
  
  // Function to create an array of employee records using the provided array of arrays.
  // Each sub-array represents an employee's data [firstName, familyName, title, payPerHour].
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
  }
  
  // Function to add a Time-In event to an employee's record.
  // dateStamp is a string with the format "YYYY-MM-DD HH:MM".
  function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    this.timeInEvents.push({ type: 'TimeIn', date, hour: parseInt(hour, 10) })
    return this;
  }
  
  // Function to add a Time-Out event to an employee's record.
  // dateStamp is a string with the format "YYYY-MM-DD HH:MM".
  function createTimeOutEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({ type: 'TimeOut', date, hour: parseInt(hour, 10) })
    return this
  }
  
  // Function to calculate the hours worked by an employee on a specific date.
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date)
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date)
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100
    return hoursWorked
  }
  
  // Function to calculate the wages earned by an employee on a specific date.
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date)
    return hoursWorked * this.payPerHour
  }
  
  // Function to calculate the total wages earned by an employee for all dates worked.
  function allWagesFor() {
    const datesWorked = this.timeInEvents.map(event => event.date)
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0)
    return totalWages
  }
  
  // Function to find an employee record by first name.
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName)
  }
  
  // Function to calculate the total payroll cost for all employees in the provided array.
  function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0)
    return totalPayroll
  }
