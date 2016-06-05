const GRID_WIDTH = 10;
const GRID_HEIGHT = 6;

$(function() {
    "use strict";

    window.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

    let $grid = $('.grid');
    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            $grid.append(
                $('<i/>').addClass('c c-' + i  + '-' + j)
            );
        }
    }

    for (var i = 0; i < 10000; i++) {
        grid.putFigure(new Figure(rnd('liysvtfzupxw'.split(''))).rotate(rnd([0, 90, 180, 270, -90, -270])), rnd(10), rnd(5))
    }
});
