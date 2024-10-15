const player = document.getElementById("player");
const kyonshi = document.getElementById("kyonshi");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let playerPosition = 50;
let kyonshiLooking = true; // キョンシーが振り向いているかどうか
let gameOver = false;
let goalPosition = 550; // ゴールの位置
let playerMoving = false; // プレイヤーが動いているかどうか
let playerMoveInterval; // プレイヤーの移動インターバル
let kyonshiToggleInterval; // キョンシーの振り向き切り替えインターバル

// キョンシーが振り向く・背を向けるランダム処理
function toggleKyonshi() {
    if (!gameOver) {
        kyonshiLooking = !kyonshiLooking;
        if (!kyonshiLooking) {
            // 反転させる: kyonshiLookingがfalseのとき背を向ける
            kyonshi.style.transform = "scaleX(1)"; // キョンシーが背を向けている状態
        } else {
            // 反転させる: kyonshiLookingがtrueのとき振り向く
            kyonshi.style.transform = "scaleX(-1)"; // キョンシーが振り向いている状態
        }
    }
}

// プレイヤーを動かす処理
function movePlayer() {
    if (!gameOver && playerMoving && kyonshiLooking) {
        playerPosition += 2; // プレイヤーが右に移動
        player.style.left = `${playerPosition}px`;

        // ゴールに到達
        if (playerPosition >= goalPosition) {
            gameOver = true;
            message.textContent = "ゴールしました！おめでとう！";
            restartButton.hidden = false;
            clearInterval(playerMoveInterval);
            clearInterval(kyonshiToggleInterval);
        }
    } else if (!gameOver && !kyonshiLooking && playerMoving) {
        // キョンシーが背を向けているときに動いたらゲームオーバー
        gameOver = true;
        message.textContent = "キョンシーに見つかりました！ゲームオーバー！";
        restartButton.hidden = false;
        clearInterval(playerMoveInterval);
        clearInterval(kyonshiToggleInterval);
    }
}

// タップ・クリックしっぱなしでプレイヤーを動かす
document.addEventListener("mousedown", startMoving);
document.addEventListener("touchstart", startMoving);

// タップ・クリックを離したらプレイヤーを止める
document.addEventListener("mouseup", stopMoving);
document.addEventListener("touchend", stopMoving);

// プレイヤーの移動を開始する関数
function startMoving() {
    if (!playerMoving) {
        playerMoving = true;
        playerMoveInterval = setInterval(movePlayer, 20); // 20ミリ秒ごとにプレイヤーを動かす
    }
}

// プレイヤーの移動を停止する関数
function stopMoving() {
    playerMoving = false;
    clearInterval(playerMoveInterval); // インターバルをクリアしてプレイヤーを停止
}

// ゲームリスタート処理
restartButton.addEventListener("click", () => {
    playerPosition = 50;
    player.style.left = `${playerPosition}px`;
    gameOver = false;
    message.textContent = "キョンシーが見ていないときに進んで、ゴールを目指せ！";
    restartButton.hidden = true;
    clearInterval(playerMoveInterval);
    clearInterval(kyonshiToggleInterval);
    startKyonshiToggle(); // キョンシーの状態を再びランダムに切り替え
});

// キョンシーの振り向きと背を向ける処理をランダムに実行するインターバルの開始
function startKyonshiToggle() {
    kyonshiToggleInterval = setInterval(toggleKyonshi, Math.random() * 2000 + 2000); // 2秒から4秒の間隔で切り替わる
}

// ゲーム開始時にキョンシーの動作を開始
startKyonshiToggle();
