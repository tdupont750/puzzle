const BoardServiceTests = function (assert, help) {
    "use strict";
    
    return {
        spawnFirstCard,
        spawnSecondCard,
        spawnThirdCard,

        matchTopRow,
        matchMiddleRow,
        matchMiddleColumn,
        matchLastColumn,
        matchBigT,

        matchTopRowFail,
        matchMiddleColumnFail
    };

    function spawnFirstCard() { spawnCard(0); }
    function spawnSecondCard() { spawnCard(1); }
    function spawnThirdCard() { spawnCard(2); }
    
    function spawnCard(expectedIndex) {
        // Arrange
        const help = Helpers(),
            mockGameData = createMockData(),
            mockState = createMockState(),
            service = BoardService(help, mockGameData, mockState);

        mockState.drawCards = ['first', 'second', 'third'];
        mockState.getCard = getCard;
        mockState.animate = animate;
        mockState.addCard = addCard;
        
        let getCardCount = 0,
            addCardCount = 0,
            addedCard = 'nope';
        
        // Act
        service.spawnCard();
        
        // Assert
        assert.areEqual(getCardCount, expectedIndex + 1, 'getCard call count');
        assert.areEqual(addCardCount, 1, 'addCard call count');
        assert.areEqual(mockState.drawCards[expectedIndex], addedCard, 'added wrong card');
        
        function getCard(el) {
            getCardCount++;
            return help.indexOf(mockState.drawCards, el) !== expectedIndex ? true : null;
        }
        
        function animate(el, a, b, func) {
            func();
        }
        
        function addCard(el) {
            addCardCount++;
            addedCard = el;
        }
    }
    
    function matchTopRow() {
        matchCards(1, 3, 0, [
            'x','x','x',
            'y','y','y',
            'z','z','z'
        ]);
    }

    function matchMiddleRow() {
        matchCards(1, 3, 4, [
            'x','z','x',
            'y','y','y',
            'z','x','z'
        ]);
    }

    function matchMiddleColumn() {
        matchCards(1, 3, 7, [
            'x','y','z',
            'z','y','x',
            'x','y','z'
        ]);
    }

    function matchLastColumn() {
        matchCards(1, 3, 8, [
            'x','y','z',
            'x','y','z',
            'x','y','z'
        ]);
    }

    function matchBigT() {
        matchCards(3, 9, 1, [
            'x','x','x',
            'y','x','y',
            'z','x','z'
        ]);
    }
    
    function matchCards(expectDiff, expectMulti, index, boardCards) {
        // Arrange
        const help = Helpers(),
            mockGameData = createMockData(),
            mockState = createMockState(boardCards),
            service = BoardService(help, mockGameData, mockState);

        // Act
        service.boardClick(mockState.boardCards[index]);
        
        // Assert
        assert.areEqual(expectDiff, mockState.diff);
        assert.areEqual(expectMulti, mockState.multiplier);
    }

    function matchTopRowFail() {
        matchCardsFail(2, [
            'x','y','z',
            'y','z','x',
            'z','x','y'
        ]);
    }

    function matchMiddleColumnFail() {
        matchCardsFail(4, [
            'x','y','z',
            'y','z','x',
            'z','x','y'
        ]);
    }

    function matchCardsFail(index, boardCards) {
        // Arrange
        const help = Helpers(),
            mockGameData = createMockData(),
            mockState = createMockState(boardCards),
            service = BoardService(help, mockGameData, mockState);

        // Act
        service.boardClick(mockState.boardCards[index]);

        // Assert
        assert.areEqual(0, mockState.diff);
        assert.areEqual(0, mockState.multiplier);
    }
    
    function createMockData() {
        return {
            makeCard: function(){}
        };
    }
    
    function createMockState(boardCards) {
        const self = {
            boardCards: [],
            selected: null,
            diff: 0,
            multiplier: 0,
            card: null, 
            animate,
            addCard,
            getCard,
            getSelected,
            addCombo
        };
        
        if (boardCards) {
            for (var i=0; i<boardCards.length; i++) {
                self.boardCards.push({
                    type: boardCards[i],
                    color: boardCards[i]
                });
            }
        }
        
        return self;

        function animate(el, a, b, func) {
            func();
        }
        
        function getSelected() {
            return self.selected;
        }
        
        function addCard(el, card) {
            self.card = null;
        }
        
        function addCombo(diff, multiplier) {
            self.diff = diff;
            self.multiplier = multiplier;
        }

        function getCard(el) {
            return el;
        }
    }
};