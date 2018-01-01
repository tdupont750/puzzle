const BoardState = function createBoardState(help, data) {
    "use strict";
    
    const CardClass = 'card',
        Selected = 'selected',
        ColorAttr = 'data-card-color',
        TypeAttr = 'data-card-type',
        comboBox = document.getElementById('combo-box'),
        scoreBox = document.getElementById('score-box'),
        comboBoxDiff = document.getElementById('combo-box-diff'),
        scoreBoxDiff = document.getElementById('score-box-diff');

    let combo = 0,
        comboDiff = 0,
        score = 0,
        scoreDiff = 0,
        selected = null;

    const self = help.makeConst({
        drawCards: document.querySelectorAll('#draw .col'),
        boardCards: document.querySelectorAll('#board .col'),
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
        init
    });

    return self;

    function init() {
        for (var i=0; i<self.drawCards.length; i++) {
            self.drawCards[i].classList.add('animated');
        }
        for (var i=0; i<self.boardCards.length; i++) {
            self.boardCards[i].classList.add('animated');
        }
    }
    
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
    
    function addCombo(diff, multiplier) {
        comboDiff = diff;
        combo += comboDiff;
        
        scoreDiff = multiplier * combo;
        score += scoreDiff;
        
        redraw();
    }

    function subtractCombo(diff) {
        comboDiff = diff;
        combo += comboDiff;
        if (combo < 0) {
            combo = 0;
        }

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
        scoreBoxDiff.innerText = (scoreDiff > 0 ? '+' : '') + scoreDiff;
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