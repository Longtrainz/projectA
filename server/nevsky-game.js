class NevskyGame {
    constructor(players) {
        this._players = players;
        this._turns = [null, null];

        this._sendToPlayers('Rock Paper Scissors Starts!');

        this._players.forEach((player, playerIndex) => {
            player.on('turn', (turn) => {
                this._onTurn(playerIndex, turn);
            });
        });
    }
}

module.exports = NevskyGame;