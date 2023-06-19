function calculateTileCoordinates() {
  const saveCoordinatesCheckbox = document.getElementById('saveCoordinates');
  const latitudeInput = document.getElementById('latitude');
  const longitudeInput = document.getElementById('longitude');

  const zoomInput = document.getElementById('zoom');
  const tileCoordinates = document.getElementById('tileCoordinates');
  const tileImage = document.getElementById('tileImage');

  const latitude = parseFloat(latitudeInput.value);
  const longitude = parseFloat(longitudeInput.value);
  const zoom = zoomInput.value ? parseInt(zoomInput.value, 10) : 19;

  // Функция для обнуления полей ввода
function resetInputFields() {
  zoomInput.value = '';
  longitudeInput.value = '';
  latitudeInput.value = '';
}

// Функция для обработки события нажатия на Enter
function handleEnterKeyPress(event) {
  if (event.key === 'Enter') {
    calculateTileCoordinates();
  }
}

saveCoordinatesCheckbox.addEventListener('change', function() {
  if (this.checked) {
    latitudeInput.disabled = true;
    longitudeInput.disabled = true;
  } else {
    latitudeInput.disabled = false;
    longitudeInput.disabled = false;
  }
});
// Функция для обработки изменения состояния чекбокса
function handleSaveCoordinatesChange() {
  if (saveCoordinatesCheckbox.checked) {
    saveCoordinatesCheckbox.disabled = true;
    zoomInput.disabled = true;
    longitudeInput.disabled = true;
    latitudeInput.disabled = true;
  } else {
    saveCoordinatesCheckbox.disabled = false;
    zoomInput.disabled = false;
    longitudeInput.disabled = false;
    latitudeInput.disabled = false;
    resetInputFields();
  }
}
// Добавляем слушатели событий
zoomInput.addEventListener('keyup', handleEnterKeyPress);
longitudeInput.addEventListener('keyup', handleEnterKeyPress);
latitudeInput.addEventListener('keyup', handleEnterKeyPress);
saveCoordinatesCheckbox.addEventListener('change', handleSaveCoordinatesChange);

  if (isNaN(latitude) || isNaN(longitude) || isNaN(zoom)) {
    tileCoordinates.innerHTML = 'Некорректные входные данные';
    tileImage.innerHTML = '';
    return;
  }

  let tileX = Math.floor((longitude + 180) / 360 * Math.pow(2, zoom));
  let tileY = Math.floor((1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1 / Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom));

  const result = `Приближение: ${zoom}, Координаты плитки: X: ${tileX}, Y: ${tileY}`;
  tileCoordinates.innerHTML = result
  tileImage.innerHTML = '<img src="https://static-maps.yandex.ru/1.x/?ll=' + longitude + ',' + latitude + '&z=' + zoom + '&l=map&size=400,400">';

    // Обнуление полей ввода
    // zoomInput.value = '';
    // longitudeInput.value = '';
    // latitudeInput.value = '';
}

const calculateBtn = document.getElementById('calculateBtn');
calculateBtn.addEventListener('click', calculateTileCoordinates);
// enter input zoom
const zoomInput = document.getElementById('zoom');
zoomInput.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    calculateTileCoordinates();
  }


});
