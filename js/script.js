var namelist = [
    "Dennis Cai",
    "Merewyn Ho",
    "Jamaine Ong",
    "Hooi Yin",
    "Louelle",
    "Felix Yap",
    "Celine Koh",
    "Celine Levesque",
    "Wissem Chambazi",
    "Sheila Tay",
    "Jenny"
]

for(i=0;i<namelist.length;i++){
    $(".slot").append("<li><span>" + namelist[i] + "</span></li>");
}

// fancy example
$('.fancy .slot').jSlots({
    number : 1,
    spinner : '#playFancy',
    easing : 'easeOutSine',
    time : 7000,
    loops : 6,
    onStart : function() {
        $('.slot').removeClass('winner');
    },
    onWin : function(winCount, winners) {
        $.each(winners, function() {
            this.addClass('winner');
        });
    }
});