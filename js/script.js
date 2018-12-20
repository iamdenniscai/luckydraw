var namelist = [
'Alex is a very long name',
'Benard',
'Candice',
'Dennis',
'Elvis',
]

$( function() {

    var winners = [];
    var originalNamelist = namelist.slice();
    var savedWinnersList = [];

    var winnersDialog = $("#winners-form").dialog({
        autoOpen: false,
        height: 400,
        width: 350,
        modal: true
    });

    var nameListDialog = $("#namelist-form").dialog({
        autoOpen: false,
        height: 500,
        width: 400,
        modal: true,
        buttons: {
            "Reset Namelist" : function(){
                clearLocalStorage();
                location.reload();
            },
            "Add Name" : showAddNameDialog,
        }
    });

    var addNameDialog = $("#add-name-form").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "Save": saveName,
        }
    });

    if(typeof(Storage) == "undefined"){
        alert("Browser does not support saving of data");
    }

    if(localStorage.winners){
        winners = JSON.parse(localStorage.winners);
        refreshWinnerList();
        savedWinnersList = calcWinnerIndexList();
    }

    if(localStorage.originalNamelist){
        originalNamelist = JSON.parse(localStorage.originalNamelist);
    }

    if(localStorage.namelist){
        namelist = JSON.parse(localStorage.namelist);
    }

    //$(".slot").append("<li><span> Lucky Draw </span></li>");
    for(i=0;i<namelist.length;i++){
        $("#namelist-tbody").append("<tr><td>" + namelist[i] + "</td></tr>");
    }
    
    for(i=0;i<originalNamelist.length;i++){
        $(".slot").append("<li><span>" + originalNamelist[i] + "</span></li>");
    }

    $("#winners-table tr td").keypress(function(event){
        
    });

    // fancy example
    $('.fancy .slot').jSlots({
        number : 1,
        spinner : '#playFancy',
        easing : 'easeOutSine',
        time : 1000,
        loops : 5,
        winnerIndexList: savedWinnersList,
        onStart : function() {
            refreshSlots();
        },
        onEnd : function(finalNumbers){
            addWinner(originalNamelist[finalNumbers - 1]);
            refreshWinnerList();
            refreshNameList();
            saveWinnerList();
            saveNameList();
        }
    });

    $( "#winners" ).on( "click", function() {
        winnersDialog.dialog("option", "title", "Winner Names - " + winners.length);
        winnersDialog.dialog("open");
    });    

    $( "#settings" ).on( "click", function() {
        nameListDialog.dialog("option", "title", "Lucky Draw Names - " + namelist.length);
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
        originalNamelist.push(name);
        addNameDialog.dialog("close");
        saveOriginalNameList();
        saveNameList();
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
        nameListDialog.dialog("option", "title", "Lucky Draw Names - " + namelist.length);
    }

    function refreshWinnerList(){
        $("#winners-tbody").empty();
        for(i=0;i<winners.length;i++){
            $("#winners-tbody").append("<tr><td>" + winners[i] + "</td></tr>");
        }
        winnersDialog.dialog("option", "title", "Winner Names - " + winners.length);
    }

    function saveWinnerList(){
        console.log('save winners');
        localStorage.setItem("winners", JSON.stringify(winners));
    }

    function saveNameList(){
        localStorage.setItem("namelist", JSON.stringify(namelist));
    }

    function saveOriginalNameList(){
        localStorage.setItem("originalNamelist", JSON.stringify(originalNamelist));
    }

    function clearLocalStorage(){
        localStorage.removeItem("winners");
        localStorage.removeItem("namelist");
        localStorage.removeItem("originalNamelist");
    }

    function calcWinnerIndexList(){
        var result = [];
        for(var i=0; i<winners.length; i++){
            for(var j=0; j<originalNamelist.length; j++){
                if(winners[i] == originalNamelist[j]){
                    result.push(j+1);
                    break;
                }
            }
        }
        return result;
    }

});