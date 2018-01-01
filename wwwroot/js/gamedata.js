const GameData = function createGameData(help) {
    "use strict";
    
    const Color = help.makeEnum('color', {
        red: 0,
        green: 1,
        blue: 2
    });

    const Type = help.makeEnum('type', {
        rock: 0,
        paper: 1,
        scissors: 2
    });

    return help.makeConst({
        Color,
        Type,
        makeCard
    });

    function makeCard() {
        return {
            color: help.rand(3),
            type: help.rand(3)
        }
    }

};