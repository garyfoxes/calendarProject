"use strict"
var initEvent = (function(initEvent) {
    var Event = function(day, month, year) {
        this.id = day.currentTarget.getAttribute("id");
        this.eventDay = day.currentTarget.innerHTML;
        this.eventMonth = month;
        this.eventYear = year;
        this.eventBody = null;
        this.openEventModal();
    }

    Event.prototype.openEventModal = function() {
        $('[data-popup="popup-1"]').fadeIn(350);
        var eventMesssageDiv = document.getElementById("eventMessage");
        document.getElementById("eventHeader").innerHTML = "Event For " + this.eventDay + " Of " + monthNames[this.eventMonth] + " " + this.eventYear;
        document.getElementById("save").onclick = this.saveEventModal.bind(this, eventMesssageDiv);
        document.getElementById("close").onclick = this.closeEventModal;
    }

    Event.prototype.saveEventModal = function(bodyText, e) {
        this.eventBody = bodyText.value;
        store.events.push(this);
        $('[data-popup="popup-1"]').fadeOut(350);
        e.preventDefault();
        localStorage.setItem("savedData", JSON.stringify(store.events));
        generateTooltipData(this);

    }
    Event.prototype.closeEventModal = function(e) {
        $('[data-popup="popup-1"]').fadeOut(350);
        e.preventDefault();
    }
    initEvent.Event = Event;
    return initEvent;

})(initEvent || {});


/*var garyCalendarApp = (function(app) {
    'use strict';

    app.data = app.data || {};
    app.data.store = function() {};

    app.view = app.view || {};
    app.view.Event = function() {};
    app.view.Box = function() {};
    return app;

})(garyCalendarApp || {});*/


var store = {
    events: []
}

var generateTooltipData = (function() {
    return function(event) {
        var cell = document.getElementById(event.id);
        if (cell.getAttribute("class") === "event") {
            var originalText = $('[data-toggle=tooltip' + event.id + ']').tooltip('hide').attr('data-original-title');
            $('[data-toggle=tooltip' + event.id + ']').tooltip('hide')
                .attr('data-original-title', originalText + " and " + event.eventBody)
                .tooltip('fixTitle');
        } else {
            cell.setAttribute("class", "event");
            cell.setAttribute("data-toggle", "tooltip" + event.id);
            cell.setAttribute("data-placement", "left");
            cell.setAttribute("data-container", "body");

            $('[data-toggle=tooltip' + event.id + ']').tooltip('hide')
                .attr('data-original-title', event.eventBody)
                .tooltip('fixTitle');
        }

        cell.onmouseover = function() {
            $('[data-toggle=tooltip' + event.id + ']').tooltip();
        }
    };
})();
