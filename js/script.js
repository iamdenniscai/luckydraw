// fancy example
$('.fancy .slot').jSlots({
    number : 1,
    winnerNumber : 1,
    spinner : '#playFancy',
    easing : 'easeOutSine',
    time : 7000,
    loops : 6,
    onStart : function() {
        $('.slot').removeClass('winner');
    },
    onWin : function(winCount, winners) {
        // only fires if you win
        
        $.each(winners, function() {
            this.addClass('winner');
        });

        // react to the # of winning slots                 
        if ( winCount === 1 ) {
            //alert('You got ' + winCount + ' 7!!!');
        } else if ( winCount > 1 ) {
            //alert('You got ' + winCount + ' 7’s!!!');
        }
        
    }
});