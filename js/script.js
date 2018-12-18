var namelist = [
'Alex',
'Bernard Saw',
'Candice Choo',
'Dennis',
'Erwin',
'Frances Tay',
'Geoffrey Koh',
'Henderson',
'Ian',
'John',
'Kenny',
]

var winners = [];
var luckyDrawRemoved = false;

$(".slot").append("<li><span> Lucky Draw <span></li>");
for(i=0;i<namelist.length;i++){
    $(".slot").append("<li><span>" + namelist[i] + "</span></li>");
    $("#namelist-tbody").append("<tr><td>" + namelist[i] + "</td></tr>");
}

$( function() {

    // fancy example
    $('.fancy .slot').jSlots({
        number : 1,
        spinner : '#playFancy',
        easing : 'easeOutSine',
        time : 1000,
        loops : 1,
        onStart : function() {
            if(!luckyDrawRemoved){
                refreshSlots();
                luckyDrawRemoved = true;
            }
            refreshSlots();
        },
        onEnd : function(finalNumbers){
            if(finalNumbers.length){
                addWinner(namelist[finalNumbers - 1]);
            }
        },
        onWin : function(winCount, winners) {
            $.each(winners, function() {
                //this.addClass('winner');
                alert(winners);
            });
        }
    });

    var winnersDialog = $("#winners-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true
    });

    var nameListDialog = $("#namelist-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true,
        buttons: {
            "Add Name" : showAddNameDialog
        }
    });

    var addNameDialog = $("#add-name-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Save": saveName,
        }
    });

    $( "#winners" ).on( "click", function() {
        winnersDialog.dialog("open");
    });    

    $( "#settings" ).on( "click", function() {
        nameListDialog.dialog("open");
    });

    function addWinner(name){
        winners.push(name);
        for(i=0; i<namelist.length; i++){
            if(namelist[i] == name){
                namelist.splice(i, 1);
                break;
            }
        }
        refreshWinnerList();
        refreshNameList();
    }

    function showAddNameDialog(){
        refreshSlots();
        addNameDialog.dialog("open");
    }

    function saveName(){
        var name = $("#name").val();
        namelist.push(name);
        addNameDialog.dialog("close");
        refreshSlots();
        refreshNameList();
    }

    function refreshSlots(){
        $(".slot").empty();
        for(i=0;i<namelist.length;i++){
            $(".slot").append("<li><span>" + namelist[i] + "</span></li>");
        }
    }

    function refreshNameList(){
        $("#namelist-tbody").empty();
        for(i=0;i<namelist.length;i++){
            $("#namelist-tbody").append("<tr><td>" + namelist[i] + "</td></tr>");
        }
    }

    function refreshWinnerList(){
        $("#winners-tbody").empty();
        for(i=0;i<winners.length;i++){
            $("#winners-tbody").append("<tr><td>" + winners[i] + "</td></tr>");
        }
    }


});