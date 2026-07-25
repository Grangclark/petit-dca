// script.js

// 画面が読み込まれたらイベントを設定
document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calcBtn");

  // シミュレーション実行ボタンが押されたときの処理
  calcBtn.addEventListener("click", calculateDCA);

  // 👑 初回表示時にも1回自動計算を実行しておく
  calculateDCA();
});

// 🪙 DCA（積立）の基本計算ロジック
function calculateDCA() {
  // 1. 入力フォームから数値を取得
  const dailyAmount = parseFloat(document.getElementById("dailyAmount").value) || 0;
  const days = parseFloat(document.getElementById("days").value) || 0;
  const coinPrice = parseFloat(document.getElementById("coinPrice").value) || 0;

  // 2. 総投資額の計算（1日の購入額 × 積立日数）
  const totalInvestment = dailyAmount * days;

  // 3. 推定獲得数量の計算（総投資額 ÷ 平均コイン価格）
  // ※コイン価格が0の場合は割り算エラーを防ぐため0にする
  const totalCrypto = coinPrice > 0 ? totalInvestment / coinPrice : 0;

  // 4. 計算結果を画面に反映（読みやすくフォーマット）
  // 日本円はカンマ区切り（例: 36,500）
  document.getElementById("totalInvestment").textContent = `¥${totalInvestment.toLocaleString()}`;
  
  // 暗号資産の数量は小数点以下8桁まで表示（末尾の無駄なゼロは整形）
  document.getElementById("totalCrypto").textContent = `${formatCrypto(totalCrypto)} BTC`;

  console.log(`📊 計算完了: 総投資額 = ¥${totalInvestment}, 獲得量 = ${totalCrypto} BTC`);
}

// 暗号資産用の数値整形関数（最大8桁表示）
function formatCrypto(amount) {
  if (amount === 0) return "0";
  // 0.00000001 BTC などの小さな桁まで綺麗に表現
  return amount.toFixed(8).replace(/\.?0+$/, "");
}