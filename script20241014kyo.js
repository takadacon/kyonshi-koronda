const player = document.getElementById("player");
const kyonshi = document.getElementById("kyonshi");
const message = document.getElementById("message");
const restartButton = document.getElementById("restart");

let playerPosition = 50;
let kyonshiLooking = true; // キョンシーが振り向いているかどうか
let gameOver = false;
let goalPosition = 550; // ゴールの位置

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

// プレイヤーが動く処理（タップ操作）
document.addEventListener("click", () => {
    if (!gameOver && kyonshiLooking) {
        playerPosition += 10; // プレイヤーが前に進む
        player.style.left = `${playerPosition}px`;

        // ゴールに到達
        if (playerPosition >= goalPosition) {
            gameOver = true;
            message.textContent = "ゴールしました！おめでとう！";
            restartButton.hidden = false;
        }
    } else if (!gameOver && !kyonshiLooking) {
        // キョンシーが背を向けているときに動いたらゲームオーバー
        gameOver = true;
        message.textContent = "キョンシーに見つかりました！ゲームオーバー！";
        restartButton.hidden = false;
    }
});

// ゲームリスタート処理
restartButton.addEventListener("click", () => {
    playerPosition = 50;
    player.style.left = `${playerPosition}px`;
    gameOver = false;
    message.textContent = "キョンシーが見ていないときに進んで、ゴールを目指せ！";
    restartButton.hidden = true;
    toggleKyonshi(); // キョンシーの状態をリセット
});

// キョンシーの振り向きと背を向ける処理をランダムに実行
setInterval(toggleKyonshi, Math.random() * 2000 + 2000); // 2秒から4秒の間隔で切り替わる
