
var Event = function(){
    this.eventDay = null;
    this.eventMonth = null;
    this.eventYear = null;
    this.eventBody = null;
}

var store = {
    events:[]
}
Event.prototype.setEventDay = function(day){
this.eventDay = day;
}
Event.prototype.setEventMonth = function(month){
this.eventMonth= month;
}
Event.prototype.setEventYear = function(year){
this.eventYear = year;
}
Event.prototype.setEventBody = function(bodyText){
this.eventBody = bodyText;
}

function closeEventModal(e){
      $('[data-popup="popup-1"]').fadeOut(350);
        e.preventDefault();
}
function saveEventModal(e){
      $('[data-popup="popup-1"]').fadeOut(350);
        e.preventDefault();
}

function openEventModal(year,month,e){
    var targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        document.getElementById("eventHeader").innerHTML = "Event For " + this.innerHTML + " Of " + monthNames[month] + " " + year;
        var saveEvent = new Event();
        saveEvent.setEventDay(this.innerHTML);
        saveEvent.setEventMonth(month);
        saveEvent.setEventYear(year);
        store.events.push(saveEvent);
        document.getElementById("save").onclick = saveEventModal.bind(saveEvent);
        document.getElementById("close").onclick = closeEventModal;
        e.preventDefault();  
}