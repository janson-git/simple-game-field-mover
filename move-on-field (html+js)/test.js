var player = {
	direction: "up",
	x: 1,
	y: 1
};

function currentPlayerIcon() {
	var icon = "^";
	switch (player.direction) {
		case "up":
			icon = "^";
			break;
		case "left":
			icon = "<";
			break;
		case "right":
			icon = ">";
			break;
		case "down":
			icon = "v";
			break;
	}
	return icon;
}


function runCommand(command) {
	switch (command) {
		case "go":
			go();
			break;
		case "left":
			rotateLeft();
			break;
		case "right":
			rotateRight();
			break;
	}
	redraw();
}

$("body").on("keypress", function(e) {
	switch (e.keyCode) {
		case 38: // UP
			runCommand("go");
			break;
		case 37:
			runCommand("left");
			break;
		case 39:
			runCommand("right");
			break;
		case 40:
			// пока не обрабатываем
			break;
	}
});


var parsedCommands = [];
// разбираем последовательность команд. Команды разделяются пробелом или переносом строки.
$("#startProgram").on("click",  function() {
	var commands = $("#commands").val();
	var result = commands.replace("\r", "");
	result = commands.replace(" ", "\n");
	result = result.split("\n");
	
	parsedCommands = result;
	runCommandList();
});

function runCommandList() {
	var currCommand = parsedCommands.shift();
	console.log(currCommand);
	if (currCommand != undefined) {
		runCommand(currCommand);
		setTimeout(runCommandList, 1000);
	} else {
		alert("All commands executed");
	}
}


function rotateLeft() {
	switch (player.direction) {
		case "up":
			player.direction = "left";
			break;
		case "left":
			player.direction = "down";
			break;
		case "down":
			player.direction = "right";
			break;
		case "right":
			player.direction = "up";
			break;
	}
}
function rotateRight() {
	switch (player.direction) {
		case "up":
			player.direction = "right";
			break;
		case "right":
			player.direction = "down";
			break;
		case "down":
			player.direction = "left";
			break;
		case "left":
			player.direction = "up";
			break;
	}
}

function redraw() {
	// возьмём игрока, почистим поле от изображений, нарисуем текущую позицию игрока.
	clearGameField();
	selectCell(player.y, player.x).html(currentPlayerIcon);
}

function clearGameField() {
	for (i = 0; i <= fieldHeight; i++) {
		for (j = 0; j <= fieldWidth; j++) {
			selectCell(i,j).html("&nbsp;");
		}
	}
}

function selectCell(row, col) {
	return $("#gameField tr").eq(row).find("td").eq(col);
}

function go() {
	var newRow = player.y, newCol = player.x;
	switch (player.direction) {
		case "up":
			if (newRow > 0) {
				newRow--;
			}
			break;
		case "down":
			if (newRow < fieldHeight) {
				newRow++;
			}
			break;
		case "left":
			if (newCol > 0) {
				newCol--;
			}
			break;
		case "right":
			if (newCol < fieldWidth) {
				newCol++;
			}
			break;
	}
	player.x = newCol;
	player.y = newRow;
}


function makeGameField(width, height) {
	var tdCount = width;
	var trCount = height;
	// очищаем текущее поле
	$("#gameField").html("");
	var newFieldHtml = "";
	for (i = 0; i < trCount; i++) {
		newFieldHtml += "\n<tr>\n";
		for (j = 0; j < tdCount; j++) {
			newFieldHtml += "\n<td>&nbsp</td>";
		}
		newFieldHtml += "\n</tr>\n";
	}
	$("#gameField").html(newFieldHtml);
}



var fieldWidth = 6;
var fieldHeight = 6;
	
(function gameStart()
{
	makeGameField(fieldWidth, fieldHeight);

	player.x = Math.floor(fieldWidth / 2);
	player.y = Math.floor(fieldHeight / 2);
	
	selectCell(player.y, player.x).html(currentPlayerIcon);
})();