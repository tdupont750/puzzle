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
        
        let i = help.indexOf(state.boardCards, el),
            row = getRow(i),
            rowMatch = getMatch(getRowI(i), row),
            isRowMatch = rowMatch.length >= data.matchCount,
            col = getCol(i),
            colMatch = getMatch(getColI(i), col),
            isColMatch = colMatch.length >= data.matchCount;
    
        if (isRowMatch && isColMatch) {
            state.addCombo(rowMatch.length + colMatch.length);
        }
        else if (isRowMatch) {
            state.addCombo(rowMatch.length);
        }
        else if (isColMatch) {
            state.addCombo(colMatch.length);
        }

        if (isRowMatch) {
            makeCards(rowMatch);
        }

        if (isColMatch) {
            makeCards(colMatch);
        }
        
        function getMatch(i, array) {
            let match = [array[i]];
            
            for(let j = i - 1; j >= 0; j--) {
                let c = state.getCard(array[j]);
                if (c !== null && c.color == card.color) {
                    match.unshift(array[j]);
                } else {
                    break;
                }
            }
            
            for(let j = i + 1; j < array.length; j++) {
                let c = state.getCard(array[j]);
                if (c !== null && c.color == card.color) {
                    match.push(array[j]);
                } else {
                    break;
                }
            }
            
            return match;
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
            state.subtractCombo();
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
    
    function getRowI(i) {
        return i % state.gridSize;
    }
    
    function getRow(i) {
        let start = getColI(i) * state.gridSize;
        return state.boardCards.slice(start, start + state.gridSize);
    }
    
    function getColI(i) {
        return Math.floor(i / state.gridSize);
    }
    
    function getCol(i) {
        let rowI = getRowI(i),
            array = [];
            
        for(let j = 0; j < state.gridSize; j++) {
            array.push(state.boardCards[rowI + (state.gridSize * j)]);
        }
        
        return array;
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