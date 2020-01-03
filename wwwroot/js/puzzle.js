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

        let board = document.getElementById('board');

        board.addEventListener("touchstart", function(e) {
            console.log('touchstart');
            let el = getElFromTouch(e);
            service.onMovement(el, true);
        });

        board.addEventListener("touchend", function(e) {
            console.log('touchend');
            service.onMovement(null, null);
        });

        window.lastElement = {};
        
        board.addEventListener("touchmove", function(e) {
            e.preventDefault();
            let el = getElFromTouch(e);
            if (el && window.lastElement !== el && el.classList.contains('col')) {
                window.lastElement = el;
                console.log('touchmove');
                service.onMovement(el, false);
            }
        });
        
        function getElFromTouch(e) {
            let touch = e.touches[0];
            return document.elementFromPoint(touch.clientX, touch.clientY);
        }

        for (let i = 0; i < state.boardCards.length; i++) {
            new Hammer(state.boardCards[i]).on('tap press pan pinch rotate swipe', onBoardClick);
        }
        
        function onDrawClick(e) {
            service.drawClick(e.target);
        }

        function onBoardClick(e) {
            service.boardClick(e.target);
        }
    }
};