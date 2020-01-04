const BoardState = function createBoardState(help, data) {
    "use strict";
    
    const CardClass = 'card',
        Selected = 'selected',
        ColorAttr = 'data-card-color',
        TypeAttr = 'data-card-type',
        comboBox = document.getElementById('combo-box'),
        scoreBox = document.getElementById('score-box'),
        comboBoxDiff = document.getElementById('combo-box-diff'),
        scoreBoxDiff = document.getElementById('score-box-diff'),
        flavorBox = document.getElementById('flavor-box');

    let combo = 0,
        comboDiff = 0,
        score = 0,
        scoreDiff = 0,
        selected = null,
        flavorText;

    const self = help.makeConst({
        drawCards: Array.from(document.querySelectorAll('#draw .col')),
        boardCards: Array.from(document.querySelectorAll('#board .col')),
        gridSize: document.querySelectorAll('#board > .row:first-child > .col').length,
        getScore,
        getCombo,
        getDiff,
        getSelected,
        setSelected,
        addCombo,
        subtractCombo,
        addCard,
        getCard,
        removeCard,
        animate,
        init/*,
        getGrid,
        getRowIndex,
        getColIndex*/
    });

    return self;

    function init() {
        for (let i=0; i<self.drawCards.length; i++) {
            self.drawCards[i].classList.add('animated');
        }
        for (let i=0; i<self.boardCards.length; i++) {
            self.boardCards[i].classList.add('animated');
        }
    }
    
    /*function getGrid() {
        let grid = [self.gridSize][self.gridSize];
        for (let i = 0; i < self.drawCards; i++) {
            grid[getRowIndex(i)][getColIndex(i)] = self.drawCards[i];
        }
        return grid;
    }

    function getRowIndex(i) {
        return i % state.gridSize;
    }

    function getColIndex(i) {
        return Math.floor(i / state.gridSize);
    }*/
    
    function getSelected() {
        return selected;
    }
    
    function setSelected(el) {
        if (selected !== null) {
            selected.classList.remove(Selected);
            selected = null;
        }
        
        if (el !== null) {
            el.classList.add(Selected);
            selected = el;
        }
    }
    
    function getScore() {
        return score;
    }

    function getCombo() {
        return combo;
    }
    
    function getDiff() {
        return comboDiff;
    }
    
    function addCombo(count) {
        /*combo = count + comboDiff;        
        scoreDiff = fib(combo);
        score += scoreDiff;
        comboDiff = 0;*/
        
        scoreDiff = 0;
        for (let i = count - 1; i > 0; i--) {
            scoreDiff += i;
        }

        score += scoreDiff;

        if (count > 8)
            flavorText = "UNBELIEVABLE";
        else if (count > 6)
            flavorText = "AMAZING";
        else if (count > 4)
            flavorText = "Great";
        else if (count > 3)
            flavorText = "Good";
        else if (count > 2)
            flavorText = "okay";
        else if (count > 1)
            flavorText = "meh";
        
        redraw();
        
        function fib(i){
            let total = 1,
                last = 0,
                temp = 0;

            while (i-- >= 0){
                temp = total;
                total += last;
                last = temp;
            }

            return total;
        }
    }

    function subtractCombo() {
        comboDiff--;
        redraw();
    }

    function addCard(el, card) {
        removeCard(el);

        el.setAttribute(ColorAttr, card.color);
        el.setAttribute(TypeAttr, card.type);

        if (card !== null) {
            el.classList.add(CardClass + '-' + data.Color.nameOf(card.color));
            el.classList.add(CardClass + '-' + data.Type.nameOf(card.type));
        }

        el.classList.add(CardClass + '-set');
    }

    function removeCard(el) {
        let card = getCard(el);

        el.removeAttribute(ColorAttr);
        el.removeAttribute(TypeAttr);

        if (card !== null) {
            el.classList.remove(CardClass + '-' + data.Color.nameOf(card.color));
            el.classList.remove(CardClass + '-' + data.Type.nameOf(card.type));
        }

        el.classList.remove(CardClass + '-set');
    }

    function getCard(el) {
        let card = {
            color: el.getAttribute(ColorAttr),
            type: el.getAttribute(TypeAttr)
        };

        if (card.color === null || card.type === null) {
            return null;
        }

        return card;
    }

    function redraw() {
        comboBox.innerText = combo;
        comboBoxDiff.innerText = (comboDiff < 0 ? '' : '+') + comboDiff;

        scoreBox.innerText = score;
        scoreBoxDiff.innerText = '(+' + scoreDiff + ')';

        flavorBox.innerText = flavorText;
    }

    function animate(el, outAnime, inAnime, func) {
        el.classList.remove('fadein', 'fadeout', 'fadeinup', 'fadeoutup', 'rotatein', 'rotateout', 'zoomin', 'zoomout');
        el.classList.add(outAnime);

        setTimeout(function() {
            func();
            el.classList.remove(outAnime);
            el.classList.add(inAnime);
        }, 100);
    }

};