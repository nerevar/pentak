$(function() {
    "use strict";

    const GRID_WIDTH = 10;
    const GRID_HEIGHT = 6;
    window.grid = new Grid(GRID_WIDTH, GRID_HEIGHT);

    let $grid = $('.grid');
    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            $grid.append(
                $('<i/>').addClass('c c-' + i  + '-' + j)
            );
        }
    }
});
