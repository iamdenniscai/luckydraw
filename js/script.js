var namelist = [
'Alex',
'Bernard',
'Candice',
]

var winners = [];
var originalNamelist = namelist.slice();

//$(".slot").append("<li><span> Lucky Draw </span></li>");
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
        loops : 5,
        onStart : function() {
            refreshSlots();
        },
        onEnd : function(finalNumbers){
            addWinner(originalNamelist[finalNumbers - 1]);
            refreshWinnerList();
            refreshNameList();
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
        console.log("winner: " + name);
        winners.push(name);
        for(i=0; i<namelist.length; i++){
            if(namelist[i] == name){
                namelist.splice(i, 1);
                break;
            }
        }
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
        for(i=0;i<originalNamelist.length;i++){
            $(".slot").append("<li><span>" + originalNamelist[i] + "</span></li>");
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