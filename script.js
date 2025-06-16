document.addEventListener('DOMContentLoaded', () => {
  fetch('data.json')
    .then(res => res.json())
    .then(data => renderApp(data));
});

function renderApp(data) {
  document.querySelector('.total-items p').textContent = data.totalItems;
  document.querySelector('.low-stock p').textContent = data.lowStock;

  const alertsContainer = document.querySelector('.critical-alerts');
  alertsContainer.innerHTML = `
    <div class="alerts-header">
      <span>⚠️ Critical Alerts</span>
      <span class="urgent-tag">Urgent</span>
    </div>
  `;

  data.criticalAlerts.forEach(alert => {
    alertsContainer.innerHTML += `
      <div class="alert">
        <strong>${alert.name}</strong>
        <small>Stock depletes in ${alert.depletion}</small>
        <div class="alert-info">${alert.left} left <span>Min: ${alert.min}</span></div>
      </div>
    `;
  });

  const inventoryContainer = document.querySelector('.inventory');
  inventoryContainer.innerHTML = `
    <div class="inventory-header">
      <h3>Inventory Overview</h3>
      <button class="filter-btn">🔍 Filter</button>
    </div>
  `;

  data.inventory.forEach(item => {
    inventoryContainer.innerHTML += `
      <div class="category">
        <div class="category-header">
          <span>${item.icon} ${item.category}</span>
          <span class="status ${item.statusType}">${item.status}</span>
        </div>
        <div class="bar ${item.statusType}" style="width: ${item.progress}%"></div>
      </div>
    `;
  });

  const restockContainer = document.querySelector('.restock');
  restockContainer.innerHTML = `<h4>📈 Restock Recommendations</h4>`;

  data.restockRecommendations.forEach(rec => {
    restockContainer.innerHTML += `
      <div class="recommendation">
        <div class="info">
          <strong>${rec.title}</strong>
          <small>Estimated delivery: ${rec.delivery}</small>
        </div>
        <button class="${rec.action === 'Order Now' ? 'primary' : 'secondary'}">${rec.action}</button>
      </div>
    `;
  });
}
