


var tttGame = {
    size: 3,
    p1: 1, //keep track of points later
    p2:2
};

var createMap = function () {
    var map = [];
    for(var i = 0; i< tttGame.size; i++){
        var row = [];
        for(var j = 0; j < tttGame.size; j++){
            row.push(0);
        }
        map.push(row);
    }
    return map;
};

var startGame = function (size) {
    tttGame.size = size;
    tttGame.map = createMap();
    //render html
    document.getElementById('board').innerHTML = renderBoard();
};
//calc players move

var calculateIndexDR= function (row, col) {
    return col - row; 
};

var calculateIndexDL = function (row, col) {
    return (tttGame.size -1) - col - row; 
};
//checks players move if won or not
var checkDiagonals = function (row, col, player) {
    var check = 0;
    //DR
    var drIndex = calculateIndexDR(row,col);
    if(drIndex >= 0){
        var base = 0;
        for(var i = drIndex; i< tttGame.size; i++ ){
            // console.log('i: ',drIndex,' r: ',base, ' c: ',i);
            // console.log('row: ',tttGame.map[base]);
            if(tttGame.map[base++][i] == player) check++;
        }
    } else {
        var base = 0;
        for(var i = Math.abs(drIndex); i< tttGame.size; i++ ){
            // console.log('i: ',drIndex,' r: ',base, ' c: ',i);
            // console.log('row: ',tttGame.map[base]);
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
            // console.log('i: ',dLIndex,' r: ',base, ' c: ',i);
            // console.log('row: ',tttGame.map[base]);
            if(tttGame.map[base++][i] == player) check++;
        }
    } else {
        var base = tttGame.size -1;
        for(var i = Math.abs(dLIndex); i < tttGame.size; i++ ){
            // console.log('i: ',dLIndex,' r: ',base, ' c: ',i);
            // console.log('row: ',tttGame.map[base]);
            if(tttGame.map[i][base--] == player) check++;
        }
    }
    if(check >= tttGame.size) return true; //player won
    return false;
};

var checkRowCol= function (row, col, player) {

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

var togglePlayer = function(e){
    var pos = document.getElementById(e.target.id);
    pos.removeAttribute(onclick);
    var rowCol = e.target.id.split(',');
    var player = Number(document.getElementById('player').innerHTML);
    // console.log(rowCol, player);
    if(tttGame.map[rowCol[0]][rowCol[1]] != 0) { return; }

    //update board
    tttGame.map[rowCol[0]][rowCol[1]] = player;
    if(player == 1) {
        pos.innerHTML = 'X';
        document.getElementById('player').innerHTML = 2;//change player
    } else {
        pos.innerHTML = 'O';
        document.getElementById('player').innerHTML = 1;//change player
    }

    //check for any wins
    if(checkRowCol(rowCol[0],rowCol[1], player)) {
        playerWon(player);
    } else if (checkDiagonals(rowCol[0],rowCol[1], player)) {
        playerWon(player);
    }

};

var reset = function(){
    tttGame.map = createMap();
    window.location.reload();
    document.getElementById('player').innerHTML = 1;//change player
    document.getElementById('board').innerHTML = renderBoard();
};

var playerWon = function(player){
    alert(`Player ${player} Won!!!!`);
};

var renderBoard = function() {
    var html = `<table> \n`;
    for(var i = 0; i < tttGame.size; i++){
        html += `<tr>`;
        for(var j=0; j<tttGame.size; j++){
            html += `<td onclick="return togglePlayer(event);" id='${i},${j}'></td>`;
        }
        html+= `</tr>\n`;
    }
    html += `</table>`;
    return html;
};
