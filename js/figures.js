const FIGURE_SIZE = 5;

class Figure {
    constructor(shape) {
        this.shape = shape;
        this.layout = Figure.getFigure(shape);
        if (!this.layout) {
            throw new Error('Figure ' + shape + ' not found!');
        }
    }

    debug() {
        for (let i = 0; i < FIGURE_SIZE; i++) {
            console.info(this.layout[i].join('').replace(/1/g, '⊠').replace(/0/g, '·'));
        }
        return this;
    }

    rotate(direction) {
        this.layout = Figure.rotateMatrix(this.layout, direction);
        this.layout = Figure.shiftMatrix(this.layout);

        return this;
    }

    static rotateMatrix(matrix, direction=-90) {
        var m = _.cloneDeep(matrix);

        // Does not work with non-square matricies.
        var transpose = function (m) {
            for (var i = 0; i < m.length; i++) {
                for (var j = i; j < m[0].length; j++) {
                    var x = m[i][j];
                    m[i][j] = m[j][i];
                    m[j][i] = x;
                }
            }
            return m;
        };

        var reverseRows = function (m) {
            //for (var i = 0, k = m.length - 1; i < k; ++i, --k) {
            //    var x = m[i];
            //    m[i] = m[k];
            //    m[k] = x;
            //}
            //return m;
            return m.reverse();
        };

        var reverseCols = function (m) {
            for (var i = 0; i < m.length; i++) {
                //for (var j = 0, k = m[i].length - 1; j < k; ++j, --k) {
                //    var x = m[i][j];
                //    m[i][j] = m[i][k];
                //    m[i][k] = x;
                //}
                m[i].reverse();
            }
            return m;
        };

        if (direction == 90 || direction == -270) {
            m = transpose(m);
            m = reverseRows(m);
        } else if (direction == -90 || direction == 270) {
            m = reverseRows(m);
            m = transpose(m);
        } else if (Math.abs(direction) == 180) {
            m = reverseCols(m);
            m = reverseRows(m);
        }

        return m;
    }

    static shiftMatrix(matrix) {
        // shift rows
        while (+matrix[0].join('') === 0) {
            for (let i = 0; i < matrix.length - 2; i++) {
                matrix[i] = matrix[i + 1];
            }
            matrix[matrix.length - 1] = new Array(FIGURE_SIZE).fill(0);
        }

        // shift cols
        while (+matrix.map(function(row) { return row[0]; }).join('') === 0) {
            for (let i = 0; i < matrix.length - 1; i++) {
                for (let j = 0; j < matrix.length - 1; j++) {
                    matrix[i][j] = matrix[i][j + 1];
                    matrix[i][j + 1] = 0;
                }
            }
            for (let i = 0; i < matrix.length - 1; i++) {
                matrix[i][matrix.length - 1] = 0;
            }
        }

        return matrix;
    }

    static getFigure(shape) {
        return ({
            'l': [
                [1,1,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [0,0,0,0,0]
            ],
            'i': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
            ],
            'y': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,0,0,0],
                [1,0,0,0,0],
                [0,0,0,0,0]
            ],
            's': [
                [0,1,0,0,0],
                [1,1,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [0,0,0,0,0]
            ],
            'v': [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            't': [
                [1,0,0,0,0],
                [1,1,1,0,0],
                [1,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'f': [
                [1,0,0,0,0],
                [1,1,1,0,0],
                [0,1,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'z': [
                [1,1,0,0,0],
                [0,1,0,0,0],
                [0,1,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'u': [
                [1,0,1,0,0],
                [1,1,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'p': [
                [1,1,0,0,0],
                [1,1,0,0,0],
                [1,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'x': [
                [0,1,0,0,0],
                [1,1,1,0,0],
                [0,1,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ],
            'w': [
                [1,0,0,0,0],
                [1,1,0,0,0],
                [0,1,1,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
            ]
        })[shape];
    }

}

class Grid {
    constructor(w, h) {
        this.map = new Array(h).fill().map(() => new Array(w).fill(0));
        this.$grid = $('.grid');
        this.figures = [];
    }

    debug() {
        for (let i = 0; i < this.map.length; i++) {
            console.info(this.map[i].join('').replace(/1/g, '⊠').replace(/0/g, '·'));
        }
    }

    getCell(x, y) {
        return this.$grid.find('.c-' + y + '-' + x);
    }

    /**
     * Размещает фигуру на поле
     * @param {Figure} figure
     * @param {Number} x
     * @param {Number} y
     * @returns {Boolean} успешно ли фигуру разместили на поле
     */
    putFigure(figure, x, y) {
        if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) {
            return false;
        }

        // Проверяем, что фигура становится
        for (let i = 0; i < FIGURE_SIZE; i++) {
            for (let j = 0; j < FIGURE_SIZE; j++) {
                try {
                    if (figure.layout[i][j] === 1 && this.map[y + i][x + j] === 1) {
                        return false;
                    }
                } catch(e) {
                    // выход за пределы массива
                    return false;
                }
            }
        }

        // Заполняем поле
        for (let i = 0; i < FIGURE_SIZE; i++) {
            for (let j = 0; j < FIGURE_SIZE; j++) {
                if (figure.layout[i][j] === 1) {
                    this.map[y + i][x + j] = 1;
                    this.getCell(x + j, y + i).addClass('c_active');
                }
            }
        }

        this.figures.push(figure);
        return true;
    }
}
