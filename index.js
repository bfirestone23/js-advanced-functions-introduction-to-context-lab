const createEmployeeRecord = (data) => {
    return {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

const createEmployeeRecords = (array) => {
    return array.map(row => {
        return createEmployeeRecord(row);
    })
};

const createTimeInEvent = (record, datetime) => {
    const [date, hour] = datetime.split(" ");
    record.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: Number.parseInt(hour)
    });
    return record;
}

const createTimeOutEvent = (record, datetime) => {
    const [date, hour] = datetime.split(" ");
    record.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: Number.parseInt(hour)
    });
    return record;
}

const hoursWorkedOnDate = (record, date) => {
    let timeInEvent = record.timeInEvents.find(e => e.date === date)
    let timeOutEvent = record.timeOutEvents.find(e => e.date === date)
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

const wagesEarnedOnDate = (record, date) => {
    return record.payPerHour * hoursWorkedOnDate(record, date);
}

const allWagesFor = (record) => {
    let dates = record.timeInEvents.map(e => e.date)
    let wages = dates.map(d => wagesEarnedOnDate(record, d))
    return wages.reduce(function(sum, num) {
        return sum + num;
    });
}

const calculatePayroll = (records) => {
    let wages = records.map(r => allWagesFor(r));
    return wages.reduce(function(sum, num) {
        return sum + num;
    })
}

const findEmployeeByFirstName = (employees, name) => {
    return employees.find(e => e.firstName === name);
}