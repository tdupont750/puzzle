const BoardService = function createBoardService(help, data, state) {
    "use strict";
    
    return help.makeConst({
        init,
        boardClick,
        drawClick,
        spawnCard
    });

    function init() {
        makeCards(state.boardCards);
    }

    function makeCards(els) {
        for (let i=0; i<els.length; i++) {
            let card = data.makeCard(),
                el = els[i];

            state.animate(el, 'rotateout', 'zoomin', function() {
                state.addCard(el, card);
            });
        }
    }

    function boardClick(target) {
        if (state.getSelected() === null) {
            matchCards(target);
        } else {
            placeCard(target);
        }
    }

    function matchCards(el) {
        let card = state.getCard(el);
        if (card === null) {
            return;
        }

        let row = getRow(el),
            col = getCol(el),
            isRowMatch = help.all(row, isColorMatch),
            isColMatch = help.all(col, isColorMatch);
        
        if (isRowMatch && isColMatch) {
            state.addCombo(3, 9);
        }
        else if (isRowMatch || isColMatch) {
            state.addCombo(1, 3);
        }

        if (isRowMatch) {
            makeCards(row);
        }

        if (isColMatch) {
            makeCards(col);
        }

        function isColorMatch(e) {
            let c = state.getCard(e);
            return c !== null && c.color == card.color;
        }
    }

    function placeCard(el) {
        let selected = state.getSelected(),
            card = state.getCard(selected),
            elCard = state.getCard(el);

        if (card === null || elCard === null) {
            return;
        }

        if (card.type != elCard.type) {
            let diff = state.getDiff();
            if (diff > 0) {
                diff = -1;
            } else {
                diff *= 2;
            }
            
            state.subtractCombo(diff);
        }

        state.animate(el, 'fadeout', 'fadeinup', function() {
            state.addCard(el, card);
        });

        state.animate(selected, 'fadeoutup', 'fadein', function() {
            state.removeCard(selected);
            state.setSelected(null);
        });
    }

    function drawClick(target) {
        if (state.getSelected() === target) {
            state.setSelected(null);
        }
        else {
            let card = state.getCard(target);
            state.setSelected(card === null ? null : target);
        }
    }

    function getRow(el) {
        let i = help.indexOf(state.boardCards, el);

        if (i < 3) {
            return [state.boardCards[0], state.boardCards[1], state.boardCards[2]];
        }
        else if (i < 6) {
            return [state.boardCards[3], state.boardCards[4], state.boardCards[5]];
        }
        else {
            return [state.boardCards[6], state.boardCards[7], state.boardCards[8]];
        }
    }

    function getCol(el) {
        let i = help.indexOf(state.boardCards, el) % 3;

        if (i === 0) {
            return [state.boardCards[0], state.boardCards[3], state.boardCards[6]];
        }
        else if (i === 1) {
            return [state.boardCards[1], state.boardCards[4], state.boardCards[7]];
        }
        else {
            return [state.boardCards[2], state.boardCards[5], state.boardCards[8]];
        }
    }

    function spawnCard() {
        for (let i=0; i<state.drawCards.length; i++) {
            let el = state.drawCards[i];

            if (state.getCard(el) === null) {

                state.animate(el, 'fadeout', 'fadein', function() {
                    let card = data.makeCard();
                    state.addCard(el, card);
                });

                break;
            }
        }
    }

};