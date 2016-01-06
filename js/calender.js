"use strict";function getFirstDayOfMonth(t,e){return new Date(t,e,1).getDay()}function initDefaultView(){var t=cal_days_in_month[currentDate.getMonth()];store.events=events;var e=new Calendar(currentMonth,currentYear,t,!0);e.generateMonthlyData(),calendarStore.singleViewCalendar=e}function initYearlyView(t){for(var e=0;12>e;e++){var n=cal_days_in_month[e],a=new Calendar(e,t,n,!1);a.generateMonthlyData(),calendarStore.multiViewCalendar.push(a)}}$(document).ready(function(){initDefaultView()});var cal_days_labels=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"],cal_days_in_month=[31,28,31,30,31,30,31,31,30,31,30,31],currentDate=new Date,currentMonth=currentDate.getMonth(),currentYear=currentDate.getFullYear(),fragment=document.createDocumentFragment(),events=JSON.parse(localStorage.getItem("savedData")),Calendar=function(t,e,n,a){this.year=e,this.month=t,this.firstDay=getFirstDayOfMonth(e,t),this.daysInMonth=n,this.previousMonth=null,this.previousMonthDays=null,this.nextMonth=null,this.nextMonthDays=null,this.currentMonthDay=null,this.nextMonthDay=null,this.previousMonthDaysStartNumber=null,this.calenderDiv=null,this.yearDiv=null,this.monthDiv=null,this.yearBackArrow=null,this.yearForwardArrow=null,this.monthForwardArrow=null,this.monthBackArrow=null,this.table=null,this.yearViewHeader=null,this.generateMonthlyView(a)};Calendar.prototype.generateMonthlyView=function(t){var e=document.getElementById("container");this.yearDiv=document.createElement("div"),this.calenderDiv=document.createElement("div"),this.monthDiv=document.createElement("div"),this.table=document.createElement("table"),t&&(this.yearBackArrow=document.createElement("img"),this.yearForwardArrow=document.createElement("img"),this.monthForwardArrow=document.createElement("img"),this.monthBackArrow=document.createElement("img"),this.monthForwardArrow.onclick=this.generateMonthData.bind(this,!0),this.monthBackArrow.onclick=this.generateMonthData.bind(this,!1),this.yearForwardArrow.onclick=this.generateYearData.bind(this,!0),this.yearBackArrow.onclick=this.generateYearData.bind(this,!1)),this.styleTable(e,t);for(var n=(this.table.rows.length,1);7>n;n++)for(var a=this.table.insertRow(-1),r=0;7>r;r++){var i=a.insertCell(r);i.setAttribute("id","row"+n+"column"+r),i.onclick=function(t){"previous"===t.currentTarget.className||"next"===t.currentTarget.className?console.log("Not Current Month"):new initEvent.Event(t,this.month,this.year)}.bind(this)}this.calenderDiv.appendChild(this.table);for(var s=this.table.createTHead(),h=s.insertRow(0),o=0;7>o;o++){var l=h.insertCell(o);l.innerHTML=cal_days_labels[o]}this.calenderDiv.appendChild(this.table),e.appendChild(fragment)},Calendar.prototype.styleTable=function(t,e){this.calenderDiv.className=e?"monthly__view":"month__for__yearview",this.calenderDiv.setAttribute("id","monthly__view"),this.calenderDiv.className+=" effect8",fragment.appendChild(this.calenderDiv),this.yearDiv.setAttribute("id","yearHeader"),this.yearDiv.setAttribute("class","calendar__header__year"),this.yearDiv.innerHTML=this.year,this.calenderDiv.appendChild(this.yearDiv),this.monthDiv.setAttribute("id","monthHeader"),this.monthDiv.setAttribute("class","calendar_header_month"),this.monthDiv.innerText=monthNames[this.month],this.calenderDiv.appendChild(this.monthDiv),this.table.setAttribute("id","table"),e&&(this.yearBackArrow.setAttribute("class","backArrow"),this.yearForwardArrow.setAttribute("class","forwardArrow"),this.yearDiv.appendChild(this.yearBackArrow),this.yearDiv.appendChild(this.yearForwardArrow),this.monthBackArrow.setAttribute("class","backArrow"),this.monthForwardArrow.setAttribute("class","forwardArrow"),this.monthDiv.appendChild(this.monthBackArrow),this.monthDiv.appendChild(this.monthForwardArrow))},Calendar.prototype.generateYearData=function(t){var e=document.getElementById("yearHeader");this.year=t?this.year+1:this.year-1,e.firstChild.data=this.year,this.firstDay=getFirstDayOfMonth(this.year,this.month),this.generateMonthlyData()},Calendar.prototype.generateMonthData=function(t){var e=document.getElementById("monthHeader");this.month=t?11===this.month?0:this.month+1:0===this.month?11:this.month-1,e.firstChild.data=monthNames[this.month],this.daysInMonth=cal_days_in_month[this.month],this.firstDay=getFirstDayOfMonth(this.year,this.month),this.generateMonthlyData()},Calendar.prototype.generateMonthlyData=function(){this.previousMonth=0===this.month?11:this.month-1,this.previousMonthDays=cal_days_in_month[this.previousMonth],this.nextMonth=11===this.month?0:this.month+1,this.nextMonthDays=cal_days_in_month[this.nextMonth],this.currentMonthDay=this.daysInMonth-1,this.nextMonthDay=this.nextMonthDays-1,this.previousMonthDaysStartNumber=this.previousMonthDays-this.firstDay+1;for(var t=this.table.rows.length,e=1;t>e;e++)for(var n=0;7>n;n++)this.initColumnData(e,n);var a=events.length;if(a>0)for(var r=0;a>r;r++){var i=events[r];i.eventMonth===this.month&&i.eventYear===this.year&&generateTooltipData(i)}},Calendar.prototype.initColumnData=function(t,e){var n=this.table.rows[t].cells[e];this.firstDay>0&&1===t&&e<this.firstDay?(n.innerHTML=this.previousMonthDaysStartNumber,this.previousMonthDaysStartNumber++,n.removeAttribute("data-popup-open"),n.setAttribute("class","previous")):this.currentMonthDay>=0?(n.innerHTML=this.daysInMonth-this.currentMonthDay,this.year===currentYear&&this.month===currentMonth&&this.daysInMonth-this.currentMonthDay===currentDate.getDate()?n.style.fontWeight="bold":n.style.fontWeight="normal",this.currentMonthDay--,n.removeAttribute("class")):(n.setAttribute("class","next"),n.removeAttribute("data-popup-open"),n.innerHTML=this.nextMonthDays-this.nextMonthDay,this.nextMonthDay--)};var calendarStore={singleViewCalendar:null,multiViewCalendar:[]};document.getElementById("btnYearlyView").onclick=function(){if(calendarStore.singleViewCalendar.calenderDiv.style.display="none",calendarStore.multiViewCalendar.length>0)for(var t in calendarStore.multiViewCalendar)calendarStore.multiViewCalendar[t].calenderDiv.style.display="block";else initYearlyView(currentYear)},document.getElementById("btnWeeklyView").onclick=function(){for(var t in calendarStore.multiViewCalendar)calendarStore.multiViewCalendar[t].calenderDiv.style.display="none";calendarStore.singleViewCalendar.calenderDiv.style.display="block"};