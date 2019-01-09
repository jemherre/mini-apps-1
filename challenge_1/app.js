


var tttGame = {
    size: 3,
    p1: 1, //keep track of points later
    p2:2
};

var createMap = function (size) {
    var map = [];
    for(var i = 0; i< size; i++){
        var row = [];
        for(var j = 0; j < size; j++){
            row.push(0);
        }
        map.push(row);
    }
    return map;
};

var startGame = function () {
    tttGame.map = createMap(tttGame.size);
};

var calculateIndexDR= function (row, col) {
    return col - row; 
};

var calculateIndexDL = function (row, col) {
    return (tttGame.size -1) - col - row; 
};


var checkDiagonals = function (row, col, player) {
    var check = 0;
    //DR
    var drIndex = calculateIndexDR(row,col);
    if(drIndex >= 0){
        var base = 0;
        for(var i = drIndex; i< tttGame.size; i++ ){
            console.log('i: ',drIndex,' r: ',base, ' c: ',i);
            console.log('row: ',tttGame.map[base]);
            if(tttGame.map[base++][i] == player) check++;
        }
    } else {
        var base = 0;
        for(var i = Math.abs(drIndex); i< tttGame.size; i++ ){
            console.log('i: ',drIndex,' r: ',base, ' c: ',i);
            console.log('row: ',tttGame.map[base]);
            if(tttGame.map[i][base++] == player) check++;
        }
    }
    if(check >= tttGame.size) return true; //player won
    //DL
    var dLIndex = calculateIndexDL(row,col);
    check = 0; //reset
    if(dLIndex > 0){
        var base = 0;
        for(var i = (tttGame.size - 1 - dLIndex); i >= 0; i-- ){
            console.log('i: ',dLIndex,' r: ',base, ' c: ',i);
            console.log('row: ',tttGame.map[base]);
            if(tttGame.map[base++][i] == player) check++;
        }
    } else {
        var base = tttGame.size -1;
        for(var i = Math.abs(dLIndex); i < tttGame.size; i++ ){
            console.log('i: ',dLIndex,' r: ',base, ' c: ',i);
            console.log('row: ',tttGame.map[base]);
            if(tttGame.map[i][base--] == player) check++;
        }
    }
    if(check >= tttGame.size) return true; //player won
    return false;
};

var checkRowCol= function (row, col, player) {
    /

    var check = 0;
    for(var i =  0; i< tttGame.size; i++ ){ //horizontal
        if(tttGame.map[row][i] === player) check++;
    }
    if(check >= tttGame.size) return true; //player won

    check = 0; //reset
    for(var i =  0; i< tttGame.size; i++ ){ //vertical
        if(tttGame.map[i][col] === player) check++;
    }
    if(check >= tttGame.size) return true;//wins
    return false;//
};