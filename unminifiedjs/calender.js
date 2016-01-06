"use strict"
$(document).ready(function() {

    initDefaultView();
});
var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();
var fragment = document.createDocumentFragment();
var events = JSON.parse(localStorage.getItem("savedData"));

var Calendar = function(currentMonth, currentYear, currentDaysInMonth, forMonthlyView) {
    this.year = currentYear;
    this.month = currentMonth;
    this.firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    this.daysInMonth = currentDaysInMonth;
    this.previousMonth = null;
    this.previousMonthDays = null;
    this.nextMonth = null;
    this.nextMonthDays = null;
    this.currentMonthDay = null;
    this.nextMonthDay = null;
    this.previousMonthDaysStartNumber = null;

    this.calenderDiv = null;
    this.yearDiv = null;
    this.monthDiv = null;
    this.yearBackArrow = null;
    this.yearForwardArrow = null;
    this.monthForwardArrow = null;
    this.monthBackArrow = null;
    this.table = null;

    this.yearViewHeader = null;

    this.generateMonthlyView(forMonthlyView);
}

/**
 * [generateMonthlyView Generate Elements For Calender, Adds Column Headers And Cells, Also
 *  Adds listeners for clicking arrows on monthly calendar view]
 * @return {[type]} [description]
 */
Calendar.prototype.generateMonthlyView = function(forMonthlyView) {

    var container = document.getElementById("container");
    this.yearDiv = document.createElement("div");
    this.calenderDiv = document.createElement("div");
    this.monthDiv = document.createElement("div");
    this.table = document.createElement("table");

    if (forMonthlyView) {
        this.yearBackArrow = document.createElement("img");
        this.yearForwardArrow = document.createElement("img");
        this.monthForwardArrow = document.createElement("img");
        this.monthBackArrow = document.createElement("img");
        this.monthForwardArrow.onclick = this.generateMonthData.bind(this, true);
        this.monthBackArrow.onclick = this.generateMonthData.bind(this, false);
        this.yearForwardArrow.onclick = this.generateYearData.bind(this, true);
        this.yearBackArrow.onclick = this.generateYearData.bind(this, false);
    }
    this.styleTable(container, forMonthlyView);

    var tableRowLength = this.table.rows.length;
    for (var rowIndex = 1; rowIndex < 7; rowIndex++) {
        var newRow = this.table.insertRow(-1);
        for (var colIndex = 0; colIndex < 7; colIndex++) {
            var newCell = newRow.insertCell(colIndex);
            newCell.setAttribute("id", "row" + rowIndex + "column" + colIndex);
            newCell.onclick = function(newCell) {
                (newCell.currentTarget.className === "previous" || newCell.currentTarget.className === "next") ? console.log("Not Current Month"): new initEvent.Event(newCell, this.month, this.year);
            }.bind(this);
        }
    }
    this.calenderDiv.appendChild(this.table);

    var tableHeader = this.table.createTHead();
    var row = tableHeader.insertRow(0);
    for (var i = 0; i < 7; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = cal_days_labels[i];
    }
    this.calenderDiv.appendChild(this.table);
    container.appendChild(fragment);

}


Calendar.prototype.styleTable = function(container, forMonthlyView) {

    this.calenderDiv.className = (forMonthlyView) ? "monthly__view" : "month__for__yearview"
    this.calenderDiv.setAttribute("id", "monthly__view");
    this.calenderDiv.className += " effect8";
    fragment.appendChild(this.calenderDiv);


    this.yearDiv.setAttribute("id", "yearHeader");
    this.yearDiv.setAttribute("class", "calendar__header__year");
    this.yearDiv.innerHTML = this.year;
    this.calenderDiv.appendChild(this.yearDiv);

    this.monthDiv.setAttribute("id", "monthHeader");
    this.monthDiv.setAttribute("class", "calendar_header_month");
    this.monthDiv.innerText = monthNames[this.month];
    this.calenderDiv.appendChild(this.monthDiv);
    this.table.setAttribute("id", "table");

    if (forMonthlyView) {
        this.yearBackArrow.setAttribute("class", "backArrow");
        this.yearForwardArrow.setAttribute("class", "forwardArrow");
        this.yearDiv.appendChild(this.yearBackArrow);
        this.yearDiv.appendChild(this.yearForwardArrow);

        this.monthBackArrow.setAttribute("class", "backArrow");
        this.monthForwardArrow.setAttribute("class", "forwardArrow");
        this.monthDiv.appendChild(this.monthBackArrow);
        this.monthDiv.appendChild(this.monthForwardArrow);

    }

}

/**
 * [generateYearData Sets Year based on whether you are moving forward or backward a year and the generates data]
 * @param  {[type]} nextYear [Parameter to determine whether to move forward or back a year]
 * @return {[type]}          [description]
 */
Calendar.prototype.generateYearData = function(nextYear) {
    var yearDiv = document.getElementById("yearHeader");
    this.year = (nextYear) ? this.year + 1 : this.year - 1;
    yearDiv.firstChild.data = this.year;
    this.firstDay = getFirstDayOfMonth(this.year, this.month);
    this.generateMonthlyData();
}


/**
 * [generateMonthData Sets New Month Based On Whether You are going back or forward a month
 * Sets the days in the month for the new month and then gets which day the 1st falls on for that month]
 * @param  {[type]} nextMonth [Parameter to determine whether to move forward or back a month]
 * @return {[type]}           [description]
 */
Calendar.prototype.generateMonthData = function(nextMonth) {
    var monthDiv = document.getElementById("monthHeader");
    this.month = nextMonth ? (this.month === 11) ? 0 : this.month + 1 : (this.month === 0) ? 11 : this.month - 1
    monthDiv.firstChild.data = monthNames[this.month];
    this.daysInMonth = cal_days_in_month[this.month];
    this.firstDay = getFirstDayOfMonth(this.year, this.month);
    this.generateMonthlyData();
}


/**
 * [generateMonthlyData Adds data to the columns]
 * @return {[type]} [description]
 */
Calendar.prototype.generateMonthlyData = function() {

    this.previousMonth = (this.month === 0) ? 11 : this.month - 1;
    this.previousMonthDays = cal_days_in_month[this.previousMonth];
    this.nextMonth = (this.month === 11) ? 0 : this.month + 1;
    this.nextMonthDays = cal_days_in_month[this.nextMonth];
    this.currentMonthDay = this.daysInMonth - 1;
    this.nextMonthDay = this.nextMonthDays - 1;
    this.previousMonthDaysStartNumber = (this.previousMonthDays - this.firstDay) + 1;
    var tableRowLength = this.table.rows.length;

    for (var currentRow = 1; currentRow < tableRowLength; currentRow++) {

        for (var currentColumn = 0; currentColumn < 7; currentColumn++) {
            this.initColumnData(currentRow, currentColumn);
        }
    }

    var eventLength = events.length;
    if (eventLength > 0) {
        for (var currentObjectIndex = 0; currentObjectIndex < eventLength; currentObjectIndex++) {
            var event = events[currentObjectIndex];
            if (event.eventMonth === this.month && event.eventYear === this.year) {
                generateTooltipData(event);
            }

        }
    }

}

/**
 * [initColumnData Generates column data for the previous month,current month and next month
 * highlights the current day if you are on the corrrect month and]
 * @param  {[type]} table         [Gets the current table that you are modifying]
 * @param  {[type]} currentRow    [Gets the current row on the table]
 * @param  {[type]} currentColumn [Gets the current column in for that row]
 * @return {[type]}               [description]
 */
Calendar.prototype.initColumnData = function(currentRow, currentColumn) {
    var cell = this.table.rows[currentRow].cells[currentColumn];
    if (this.firstDay > 0 && currentRow === 1 && currentColumn < this.firstDay) {
        cell.innerHTML = this.previousMonthDaysStartNumber;
        this.previousMonthDaysStartNumber++;
        cell.removeAttribute("data-popup-open");
        cell.setAttribute("class", "previous");
    } else if (this.currentMonthDay >= 0) {
        cell.innerHTML = this.daysInMonth - this.currentMonthDay;
        if (this.year === currentYear && this.month === currentMonth && (this.daysInMonth - this.currentMonthDay) === currentDate.getDate()) {
            cell.style.fontWeight = "bold";
        } else {
            cell.style.fontWeight = "normal";
        }
        this.currentMonthDay--;
        cell.removeAttribute("class");
    } else {
        cell.setAttribute("class", "next");
        cell.removeAttribute("data-popup-open");
        cell.innerHTML = this.nextMonthDays - this.nextMonthDay;
        this.nextMonthDay--;
    }
}

function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
}

function initDefaultView() {
    var currentDaysInMonth = cal_days_in_month[currentDate.getMonth()];
    store.events = events;
    var newCalendar = new Calendar(currentMonth, currentYear, currentDaysInMonth, true);
    newCalendar.generateMonthlyData();
    calendarStore.singleViewCalendar = newCalendar;


}

function initYearlyView(year) {
    for (var currentMonth = 0; currentMonth < 12; currentMonth++) {
        var currentDaysInMonth = cal_days_in_month[currentMonth];
        var calendar = new Calendar(currentMonth, year, currentDaysInMonth, false);
        calendar.generateMonthlyData();
        calendarStore.multiViewCalendar.push(calendar);

    }
}
var calendarStore = {
    singleViewCalendar: null,
    multiViewCalendar: []
}

document.getElementById("btnYearlyView").onclick = function() {
    calendarStore.singleViewCalendar.calenderDiv.style.display = "none";
    if (calendarStore.multiViewCalendar.length > 0) {
        for (var position in calendarStore.multiViewCalendar) {
            calendarStore.multiViewCalendar[position].calenderDiv.style.display = "block";
        }
    } else {
        initYearlyView(currentYear);
    }
}
document.getElementById("btnWeeklyView").onclick = function() {
    for (var position in calendarStore.multiViewCalendar) {
        calendarStore.multiViewCalendar[position].calenderDiv.style.display = "none";
    }
    calendarStore.singleViewCalendar.calenderDiv.style.display = "block";

}
