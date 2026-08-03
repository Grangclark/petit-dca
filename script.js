// script.js (完全版)

document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("calcBtn");
  calcBtn.addEventListener("click", calculateDCA);

  // 👑【今日の一撃】プリセットボタンのイベントリスナー設定
  const presetButtons = document.querySelectorAll(".btn-preset");
  presetButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const amount = e.target.getAttribute("data-amount");
      const days = e.target.getAttribute("data-days");

      // フォームの値を更新
      document.getElementById("dailyAmount").value = amount;
      document.getElementById("days").value = days;

      // 即時再計算を実行！
      calculateDCA();
    });
  });

  // 初回表示時の自動計算
  calculateDCA();
});

function calculateDCA() {
  const dailyAmount = parseFloat(document.getElementById("dailyAmount").value) || 0;
  const days = parseFloat(document.getElementById("days").value) || 0;
  const coinPrice = parseFloat(document.getElementById("coinPrice").value) || 0;
  
  const currentCoinPriceInput = document.getElementById("currentCoinPrice").value;
  const currentCoinPrice = currentCoinPriceInput !== "" ? parseFloat(currentCoinPriceInput) : coinPrice;

  const totalInvestment = dailyAmount * days;
  const totalCrypto = coinPrice > 0 ? totalInvestment / coinPrice : 0;

  const currentValuation = totalCrypto * currentCoinPrice;
  const profitAndLoss = currentValuation - totalInvestment;
  const profitMargin = totalInvestment > 0 ? (profitAndLoss / totalInvestment) * 100 : 0;

  document.getElementById("totalInvestment").textContent = `¥${totalInvestment.toLocaleString()}`;
  document.getElementById("totalCrypto").textContent = `${formatCrypto(totalCrypto)} BTC`;
  document.getElementById("currentValuation").textContent = `¥${Math.round(currentValuation).toLocaleString()}`;
  
  const pnlElement = document.getElementById("profitAndLoss");
  const pnlContainer = pnlElement.parentElement;

  pnlContainer.classList.remove("profit-plus", "profit-minus", "profit-zero");

  const pnlSign = profitAndLoss > 0 ? "+" : "";
  const formattedPnl = `¥${Math.round(profitAndLoss).toLocaleString()}`;
  const formattedMargin = `${pnlSign}${profitMargin.toFixed(2)}%`;
  
  pnlElement.textContent = `${pnlSign}${formattedPnl} (${formattedMargin})`;

  if (profitAndLoss > 0) {
    pnlContainer.classList.add("profit-plus");
  } else if (profitAndLoss < 0) {
    pnlContainer.classList.add("profit-minus");
  } else {
    pnlContainer.classList.add("profit-zero");
  }

  console.log(`📊 シミュレーション完了: DCA計算実行`);
}

function formatCrypto(amount) {
  if (amount === 0) return "0";
  return amount.toFixed(8).replace(/\.?0+$/, "");
}