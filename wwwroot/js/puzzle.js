const Puzzle = function createPuzzle(help, service, state) {
    "use strict";
    
    const timeBox = document.getElementById('time-box');
    
    let time = window.location.search.includes("short") ? 30 : 120;
    
    return help.makeConst({
        run
    });
    
    function run() {
        // Init
        state.init();
        service.init();
        setupClicks();

        // Prompt user
        window.alert('Create rows and columns of mathcing colors.\r\n\r\nPlace cards on matching icons to preserve your score multiplier.\r\n\r\nGood luck!');
        
        // Start clock
        timeBox.innerText = time;
        setInterval(clock, 1000);

        // Start spawning cards
        setInterval(service.spawnCard, 2500);
        service.spawnCard();
    }
    
    function clock() {
        time--;
        timeBox.innerText = time;

        if (time === 0) {
            window.alert('End of Game - Score: ' + state.getScore());
            window.location.reload();
        }
    }

    function setupClicks() {
        for (let i = 0; i < state.drawCards.length; i++) {
            new Hammer(state.drawCards[i]).on('tap press pan pinch rotate swipe', onDrawClick);
        }

        for (let i = 0; i < state.boardCards.length; i++) {
            new Hammer(state.boardCards[i]).on('tap press pan pinch rotate swipe', onBoardClick);
            state.boardCards[i].onmousedown = function() { service.onMovement(this, true);  };
            state.boardCards[i].onmouseover = function() { service.onMovement(this, false);  };
            // state.boardCards[i].onmouseup =   function() { service.onMovement(this, false); };
        }
        
        document.onmouseup = function() { service.onMovement(null, null); };
        
        function onDrawClick(e) {
            service.drawClick(e.target);
        }

        function onBoardClick(e) {
            service.boardClick(e.target);
        }
    }
};