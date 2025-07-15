function calculateMaintenance() {
  const clientName = document.getElementById('client-name').value;
  const carBrand = document.getElementById('car-brand').value;
  const carModel = document.getElementById('car-model').value;
  const carPlate = document.getElementById('car-plate').value;
  const phoneNumber = document.getElementById('phone-number').value;
  const mileage = document.getElementById('mileage').value;
  const lastMaintenanceDate = new Date(document.getElementById('last-maintenance-date').value);
  const comments = document.getElementById('comments').value;
  const today = new Date();

  if (!lastMaintenanceDate || isNaN(lastMaintenanceDate.getTime())) {
    alert('Por favor, ingresa una fecha válida.');
    return;
  }

  const monthsSinceLastMaintenance = (today.getFullYear() - lastMaintenanceDate.getFullYear()) * 12 + (today.getMonth() - lastMaintenanceDate.getMonth());

  let maintenanceRecommendation = '';
  let partsToChange = '';
  let warningMessage = '';
  let warningClass = '';

  if (monthsSinceLastMaintenance >= 12) {
    maintenanceRecommendation = 'Mantenimiento exhaustivo correctivo';
    partsToChange = 'Revisión general, cambio de bujías, cambios de filtros, revisión del motor, revisión de frenos, correas, etc.';
    warningMessage = '⚠️ ¡Es importante realizar los mantenimientos a tiempo! De lo contrario, el auto podría sufrir daños graves.';
    warningClass = 'warning'; // Aplicar estilo de advertencia
  } else if (monthsSinceLastMaintenance >= 8) {
    maintenanceRecommendation = 'Mantenimiento correctivo medio';
    partsToChange = 'Cambio de filtros, revisión de frenos, inspección de suspensión y revisión de líquidos.';
  } else if (monthsSinceLastMaintenance >= 5) {
    maintenanceRecommendation = 'Mantenimiento preventivo bajo';
    partsToChange = 'Cambio de aceite y filtros.';
  } else {
    maintenanceRecommendation = 'Mantenimiento ligero';
    partsToChange = 'Revisión básica y cambio de aceite si es necesario.';
  }

  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
    <h3>Recomendación de Mantenimiento</h3>
    <p><strong>Cliente:</strong> ${clientName}</p>
    <p><strong>Recomendación:</strong> ${maintenanceRecommendation}</p>
    <p><strong>Partes a revisar/cambiar:</strong> ${partsToChange}</p>
    ${warningMessage ? `<p class="${warningClass}">${warningMessage}</p>` : ''}
  `;

  const historyTable = document.getElementById('history-table').querySelector('tbody');
  const newRow = historyTable.insertRow();
  newRow.innerHTML = `
    <td>${clientName}</td>
    <td>${carBrand}</td>
    <td>${carModel}</td>
    <td>${carPlate}</td>
    <td>${mileage}</td>
    <td>${maintenanceRecommendation}</td>
    <td>${partsToChange}</td>
  `;
}

function clearForm() {
  document.getElementById('maintenance-form').reset();
  document.getElementById('results').innerHTML = '';
}
