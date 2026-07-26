// script.js

document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calcBtn");
  calcBtn.addEventListener("click", calculateDCA);
  calculateDCA();
});

function calculateDCA() {
  // 1. 各フォームから値を取得
  const dailyAmount = parseFloat(document.getElementById("dailyAmount").value) || 0;
  const days = parseFloat(document.getElementById("days").value) || 0;
  const coinPrice = parseFloat(document.getElementById("coinPrice").value) || 0;
  
  // 👑【今日の一撃】現在の価格を取得（未入力の場合は購入価格と同じにする）
  const currentCoinPriceInput = document.getElementById("currentCoinPrice").value;
  const currentCoinPrice = currentCoinPriceInput !== "" ? parseFloat(currentCoinPriceInput) : coinPrice;

  // 2. 基本計算（総投資額＆獲得数量）
  const totalInvestment = dailyAmount * days;
  const totalCrypto = coinPrice > 0 ? totalInvestment / coinPrice : 0;

  // 👑【今日の一撃】評価額＆損益計算
  // 評価額 = 獲得数量 × 現在のコイン価格
  const currentValuation = totalCrypto * currentCoinPrice;
  // 損益額 = 評価額 - 総投資額
  const profitAndLoss = currentValuation - totalInvestment;
  // 収益率(%) = (損益額 ÷ 総投資額) × 100
  const profitMargin = totalInvestment > 0 ? (profitAndLoss / totalInvestment) * 100 : 0;

  // 3. 画面描画
  document.getElementById("totalInvestment").textContent = `¥${totalInvestment.toLocaleString()}`;
  document.getElementById("totalCrypto").textContent = `${formatCrypto(totalCrypto)} BTC`;

  // 👑【今日の一撃】評価額と損益の反映
  document.getElementById("currentValuation").textContent = `¥${Math.round(currentValuation).toLocaleString()}`;
  
  // 損益のプラス・マイナス記号のフォーマット
  const pnlSign = profitAndLoss > 0 ? "+" : "";
  const formattedPnl = `¥${Math.round(profitAndLoss).toLocaleString()}`;
  const formattedMargin = `${pnlSign}${profitMargin.toFixed(2)}%`;
  
  document.getElementById("profitAndLoss").textContent = `${pnlSign}${formattedPnl} (${formattedMargin})`;

  console.log(`📊 シミュレーション完了: 評価額=¥${currentValuation}, 損益=¥${profitAndLoss} (${profitMargin.toFixed(2)}%)`);
}

function formatCrypto(amount) {
  if (amount === 0) return "0";
  return amount.toFixed(8).replace(/\.?0+$/, "");
}