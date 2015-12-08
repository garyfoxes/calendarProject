
var Event = function(){
    this.eventDay = null;
    this.eventMonth = null;
    this.eventYear = null;
    this.eventBody = null;
}

var store = function(){
    events:[];
}

$(function() {
   $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = jQuery(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        e.preventDefault();
    });
});

function openEventModal(year,month,e){
    var targeted_popup_class = jQuery(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        document.getElementById("eventHeader").innerHTML = "Event For " + this.innerHTML + " Of " + monthNames[month] + " " + year;
        e.preventDefault();  
}