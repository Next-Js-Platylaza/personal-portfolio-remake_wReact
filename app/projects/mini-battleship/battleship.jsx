"use client";
import {
	useEffect,
	useState,
	useContext,
	createContext,
	useReducer,
} from "react";

const debugMode = false;

function placeRandomBoats(initialGameData) {
	if (initialGameData.hasBeenSetup) {
		return initialGameData;
	} else {
		let newGameData = initialGameData;
		const disallowedCenters = [
			[0, 0],
			[3, 0],
			[0, 3],
			[3, 3],
		];

		for (let i = 0; i < 2; i++) {
			// Define variables
			let shipCenter = [0, 0];
			let shipIsVertical = null;

			// Determine where the center of each ship should go
			let isValidCenter = false;
			while (!isValidCenter) {
				shipCenter = [
					Math.floor(Math.random() * 4) + 0,
					Math.floor(Math.random() * 4) + 0,
				];

				isValidCenter = true;
				for (let j = 0; j < disallowedCenters.length; j++) {
					if (
						shipCenter[0] == disallowedCenters[j][0] &&
						shipCenter[1] == disallowedCenters[j][1]
					) {
						isValidCenter = false;
					}
				}
			}

			// Determine if the ship should be vertical or horizontal
			if (shipCenter[0] == 0 || shipCenter[0] == 3) {
				shipIsVertical = false;
			} else if (shipCenter[1] == 0 || shipCenter[1] == 3) {
				shipIsVertical = true;
			} else {
				shipIsVertical = Math.floor(Math.random() * 2) == 1;
			}

			// Lengthen the ship so it is 3 squares long instead of 1
			let shipTiles = [{}, {}, {}];
			if (shipIsVertical) {
				for (let j = 0; j < 3; j++) {
					let row = shipCenter[0];
					switch (j) {
						case 0:
							row--;
							break;
						case 2:
							row++;
							break;
					}

					shipTiles[j] = {
						isPlayerBoard: i == 0,
						rowId: row,
						columnId: shipCenter[1],
						status: 0,
					};
				}
			} else {
				for (let j = 0; j < 3; j++) {
					let col = shipCenter[1];
					switch (j) {
						case 0:
							col--;
							break;
						case 2:
							col++;
							break;
					}

					shipTiles[j] = {
						isPlayerBoard: i == 0,
						rowId: shipCenter[0],
						columnId: col,
						status: 0,
					};
				}
			}

			// Tell the game where the shipTiles are
			newGameData.boxes = newGameData.boxes.map((b) => {
				if (b.isPlayerBoard == (i == 0)) {
					for (let i = 0; i < 3; i++) {
						if (
							b.isPlayerBoard == shipTiles[i].isPlayerBoard &&
							b.rowId == shipTiles[i].rowId &&
							b.columnId == shipTiles[i].columnId
						) {
							if (debugMode) {
								console.log(
									"b & shipTiles[" + i + "] ARE EQUAL!",
								);
								console.log(
									"newGameData.boxes (b) - Row: " +
										b.rowId +
										". Column: " +
										b.columnId +
										". Status: " +
										b.status +
										". Board: " +
										b.isPlayerBoard +
										".",
								);
								console.log(
									"newGameData.boxes (shipTiles[" +
										i +
										"]) - Row: " +
										shipTiles[i].rowId +
										". Column: " +
										shipTiles[i].columnId +
										". Status: " +
										shipTiles[i].status +
										". Board: " +
										shipTiles[i].isPlayerBoard +
										".",
								);
							}
							b.status = 3;
						}
					}
				}
				return b;
			});
		}

		newGameData.hasBeenSetup = true;
		return newGameData;
	}
}

export default function BattleshipPage() {
	const [hasBeenSetup, setHasBeenSetup] = useState(false);

	useEffect(() => {
		setHasBeenSetup(true);
	}, []);

	let content = hasBeenSetup && (
		<BattleshipGame initialGameData={placeRandomBoats(baseGameData)}>
			<Board isPlayerBoard={true} />
			<Board isPlayerBoard={false} />
		</BattleshipGame>
	);

	return (
		<div className="bg-[#735A2D] min-h-full h-auto h-full mb-[-140pt] mt-0 mx-auto m-auto">
			<div className="h-[150pt] m-auto"></div>
			{content}
			<div className="h-[155pt] m-auto"></div>
		</div>
	);
}
function BattleshipGame({ children, initialGameData }) {
	const [gameData, dispatch] = useReducer(gameReducer, initialGameData);

	return (
		<div className="flex m-auto">
			<GameContext value={gameData}>
				<GameDispatchContext value={dispatch}>
					{children}
				</GameDispatchContext>
			</GameContext>
		</div>
	);
}

function Board({ isPlayerBoard }) {
	const game = useGame();

	let titleText = isPlayerBoard ? "- Player" : "- Computer";
	titleText += "'s Board -";

	let subtitleText = "";
	if (game.winner != null) {
		subtitleText += isPlayerBoard ? "Player" : "Computer";
		subtitleText +=
			isPlayerBoard == (game.winner == "Player") ? " Won!" : " Lost :(";
	}
	return (
		<div className="m-auto">
			<div className="flex m-auto">
				<h2 className="m-auto pt-[0pt] pb-[20pt] px-[0pt]">
					{titleText}
				</h2>
			</div>
			<div className="flex m-auto">
				<h3 className="m-auto pt-[0pt] pb-[20pt] px-[0pt]">
					{subtitleText}
				</h3>
			</div>
			<div className="bg-[#eeeeee] border-[7px] border-solid border-[black] m-auto">
				<Row id={0} isPlayerBoard={isPlayerBoard} />
				<Row id={1} isPlayerBoard={isPlayerBoard} />
				<Row id={2} isPlayerBoard={isPlayerBoard} />
				<Row id={3} isPlayerBoard={isPlayerBoard} />
			</div>
		</div>
	);
}

function Row({ id, isPlayerBoard }) {
	if (debugMode) {
		console.log("Row - Row: " + id);
	}
	const game = useGame();
	return (
		<div className="div">
			<Box
				rowId={id}
				columnId={0}
				isPlayerBoard={isPlayerBoard}
				game={game}
			/>
			<Box
				rowId={id}
				columnId={1}
				isPlayerBoard={isPlayerBoard}
				game={game}
			/>
			<Box
				rowId={id}
				columnId={2}
				isPlayerBoard={isPlayerBoard}
				game={game}
			/>
			<Box
				rowId={id}
				columnId={3}
				isPlayerBoard={isPlayerBoard}
				game={game}
			/>
		</div>
	);
}
function Box(data) {
	if (debugMode) {
		console.log(
			"Box - Row: " + data.rowId + ". Column: " + data.columnId + ".",
		);
	}
	const box = getBox(data, data.game.boxes);
	const dispatch = useGameDispatch();
	const boxClass =
		box.status == 0 || (!box.isPlayerBoard && box.status == 3)
			? "text-center text-[50pt] w-[75pt] h-[75pt] bg-[#00113350] border-2 border-solid border-[#333333] text-[#00000000]" // Empty Box
			: "text-center text-[50pt] w-[75pt] h-[75pt] bg-[#00113350] border-2 border-solid border-[#333333]"; // Box

	return (
		<button
			className={boxClass}
			onClick={() => {
				dispatch({
					type: "click",
					box: box,
				});
			}}
		>
			{boxText(box.status, box.isPlayerBoard)}
		</button>
	);
}

function getBox(data, boxes) {
	if (debugMode) {
		console.log(
			"getBox(data) - Row: " +
				data.rowId +
				". Column: " +
				data.columnId +
				". Status: " +
				data.status +
				". Board: " +
				data.isPlayerBoard +
				".",
		);
	}

	const foundRow = boxes.filter((box) => box.rowId === data.rowId);
	const foundBoxes = foundRow.filter((box) => box.columnId === data.columnId);
	const foundBox = foundBoxes.find(
		(box) => box.isPlayerBoard === data.isPlayerBoard,
	);

	if (debugMode) {
		console.log(
			"getBox(foundBox) - Row: " +
				foundBox.rowId +
				". Column: " +
				foundBox.columnId +
				". Status: " +
				foundBox.status +
				". Board: " +
				foundBox.isPlayerBoard +
				".",
		);
	}

	return foundBox;
}
function boxText(boxState, isPlayerBox) {
	let text = "";
	switch (boxState) {
		case 0:
			text = "~";
			break;
		case 1:
			text = "O";
			break;
		case 2:
			text = "X";
			break;
		case 3:
			if (isPlayerBox) {
				text = "B";
			} else {
				text = "-";
			}
			break;
		default:
			text = boxState;
			console.log("boxState = " + boxState);
			break;
	}
	return text;
}

function botChooseBox(game) {
	let box = null;
	while (box == null) {
		// Setup variables
		let randomRow = Math.floor(Math.random() * 4);
		let randomCol = Math.floor(Math.random() * 4);
		let data = {
			isPlayerBoard: true,
			rowId: randomRow,
			columnId: randomCol,
		};

		// If there is already a hit box, choose a box next to it
		if (game.botHitBoxes.length > 0) {
			const hitBox =
				game.botHitBoxes[
					Math.floor(Math.random() * game.botHitBoxes.length)
				];
			// Choose a random direction to go from the original box
			const goHorizontally = Math.floor(Math.random() * 2) == 1;
			let goUp = Math.floor(Math.random() * 3) == 1;
			let goLeft = Math.floor(Math.random() * 3) == 1;

			// Ensure the bot doesn't try to aim outside of the board
			if (hitBox.rowId == 0) {
				goUp = false;
			} else if (hitBox.rowId == 3) {
				goUp = true;
			}
			if (hitBox.columnId == 0) {
				goLeft = false;
			} else if (hitBox.columnId == 3) {
				goLeft = true;
			}

			// Update 'data' to the newly chosen box
			if (goHorizontally) {
				data.rowId = goUp ? hitBox.rowId - 1 : hitBox.rowId + 1;
				data.columnId = hitBox.columnId;
			} else {
				data.rowId = hitBox.rowId;
				data.columnId = goLeft
					? hitBox.columnId - 1
					: hitBox.columnId + 1;
			}
		}

		// Find the box on the board
		if (debugMode) {
			console.log("Board| data: ");
			console.log(data);
		}
		box = getBox(data, game.boxes);
		if (debugMode) {
			console.log("Board| box.status: " + box.status);
		}

		// Try again if the chosen box has already been hit or missed
		if (box.status == 1 || box.status == 2) {
			box = null;
		}
	}
	if (debugMode) {
		console.log("Board| box: ");
		console.log(box);
	}
	return box;
}

function getWinner(game) {
	if (game.winner != null) {
		return game.winner;
	}

	let playerBoardHits = 0;
	let botBoardHits = 0;

	game.boxes.forEach((box) => {
		if (box.status == 2) {
			if (box.isPlayerBoard) {
				playerBoardHits++;
			} else {
				botBoardHits++;
			}
		}
	});

	if (playerBoardHits >= 3) {
		console.log("Game Is Over! - Computer wins");
		return "Computer";
	} else if (botBoardHits >= 3) {
		console.log("Game Is Over! - Player wins");
		return "Player";
	} else {
		return null;
	}
}

function getNewBoxes(boxes, box) {
	return boxes.map((b) => {
		if (b === box) {
			switch (b.status) {
				case 0:
					b.status = 1;
					break;
				case 3:
					b.status = 2;
					break;
				default:
					return b;
			}
		}
		return b;
	});
}

const GameContext = createContext(null);
const GameDispatchContext = createContext(null);

function useGame() {
	return useContext(GameContext);
}

function useGameDispatch() {
	return useContext(GameDispatchContext);
}

function gameReducer(game, action) {
	let newGameData = game;
	if (action.type == "click") {
		if (debugMode) {
			console.log(
				"click: " +
					action.box.rowId +
					":" +
					action.box.columnId +
					" - " +
					action.box.status,
			);
		}
		if (action.box.isPlayerBoard || game.gameIsOver) {
			return game;
		}

		const playerBoxStatus = action.box.status;
		newGameData.boxes = getNewBoxes(game.boxes, action.box);

		const winner = getWinner(newGameData);
		let botBox = null;

		if (winner == null) {
			botBox =
				playerBoxStatus == 0 || playerBoxStatus == 3
					? botChooseBox(newGameData)
					: null;
			newGameData.boxes = getNewBoxes(newGameData.boxes, botBox);
			if (botBox != null && botBox.status == 2) {
				newGameData.botHitBoxes.push(botBox);
			}
		}

		return {
			...newGameData,
			gameIsOver: winner !== null,
			winner: winner,
		};
	} else {
		throw Error("Unknown action: " + action.type);
	}
}

const baseGameData = {
	hasBeenSetup: false,
	gameIsOver: false,
	winner: null,
	botHitBoxes: [],
	boxes: [
		{ isPlayerBoard: true, rowId: 0, columnId: 0, status: 0 },
		{ isPlayerBoard: true, rowId: 0, columnId: 1, status: 0 },
		{ isPlayerBoard: true, rowId: 0, columnId: 2, status: 0 },
		{ isPlayerBoard: true, rowId: 0, columnId: 3, status: 0 },
		{ isPlayerBoard: true, rowId: 1, columnId: 0, status: 0 },
		{ isPlayerBoard: true, rowId: 1, columnId: 1, status: 0 },
		{ isPlayerBoard: true, rowId: 1, columnId: 2, status: 0 },
		{ isPlayerBoard: true, rowId: 1, columnId: 3, status: 0 },
		{ isPlayerBoard: true, rowId: 2, columnId: 0, status: 0 },
		{ isPlayerBoard: true, rowId: 2, columnId: 1, status: 0 },
		{ isPlayerBoard: true, rowId: 2, columnId: 2, status: 0 },
		{ isPlayerBoard: true, rowId: 2, columnId: 3, status: 0 },
		{ isPlayerBoard: true, rowId: 3, columnId: 0, status: 0 },
		{ isPlayerBoard: true, rowId: 3, columnId: 1, status: 0 },
		{ isPlayerBoard: true, rowId: 3, columnId: 2, status: 0 },
		{ isPlayerBoard: true, rowId: 3, columnId: 3, status: 0 },

		{ isPlayerBoard: false, rowId: 0, columnId: 0, status: 0 },
		{ isPlayerBoard: false, rowId: 0, columnId: 1, status: 0 },
		{ isPlayerBoard: false, rowId: 0, columnId: 2, status: 0 },
		{ isPlayerBoard: false, rowId: 0, columnId: 3, status: 0 },
		{ isPlayerBoard: false, rowId: 1, columnId: 0, status: 0 },
		{ isPlayerBoard: false, rowId: 1, columnId: 1, status: 0 },
		{ isPlayerBoard: false, rowId: 1, columnId: 2, status: 0 },
		{ isPlayerBoard: false, rowId: 1, columnId: 3, status: 0 },
		{ isPlayerBoard: false, rowId: 2, columnId: 0, status: 0 },
		{ isPlayerBoard: false, rowId: 2, columnId: 1, status: 0 },
		{ isPlayerBoard: false, rowId: 2, columnId: 2, status: 0 },
		{ isPlayerBoard: false, rowId: 2, columnId: 3, status: 0 },
		{ isPlayerBoard: false, rowId: 3, columnId: 0, status: 0 },
		{ isPlayerBoard: false, rowId: 3, columnId: 1, status: 0 },
		{ isPlayerBoard: false, rowId: 3, columnId: 2, status: 0 },
		{ isPlayerBoard: false, rowId: 3, columnId: 3, status: 0 },
	],
};
