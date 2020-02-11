/**
 * Call to the backend API to get the whole graphs array
 * @returns {Array}
 */
function getGraphs() {
  return fetch('/api/graphs')
    .then(res => res.json())
    .then(response => response)
    .catch(err => {
      console.log('An error has occurred');
      document.getElementById('main').innerHTML = `
        <div class="error-container">
          <h1>Oops! An error has occurred.</h1>
        </div>
      `;
    });
}

/**
 * Render donut graph with it's title and total value
 * @param {Object} element - Parent element (The card element)
 * @param {Object} boxData - All the graph object.
 */
function renderCircle(element, { title, total, colors, left }) {
  const degree = (left.percentage / 100 * 360);
  const donut = createDiv();
        donut.className = 'donut';

  const percentage = createDiv();
        percentage.className = 'donut-case';
        percentage.style.backgroundColor = colors.secondary;

  const text = createDiv();
        text.className = 'donut-text';

  const before = createDiv();
        before.className = 'before';
        before.style.backgroundColor = colors.primary;
  const after = createDiv();
        after.className = 'after';
        after.style.backgroundColor = colors.primary;
        after.style.transform = `rotate(${degree}deg)`;
  
  // If the degree will be less than 180 (Or percentage less than 50), "invert roles" on before and after
  if (left.percentage < 50) {
    after.style.backgroundColor = colors.secondary;
    after.style.transform = `rotate(360deg)`;
    before.style.transform = `rotate(${degree}deg)`;
  }

  const center = createDiv();
        center.className = 'center';
  const centerTitle = createP();
        centerTitle.className = 'title';
        centerTitle.innerText = title;
  const centerValue = createP();
        centerValue.className = 'total-value';
        centerValue.innerText = total;

  percentage.append(before);
  percentage.append(after);
  center.append(centerTitle);
  center.append(centerValue);
  text.append(center);
  donut.append(percentage);
  donut.append(text);
  element.append(donut);
}

/**
 * Render card's footer
 * @param {Object} element - Parent element (The card element)
 * @param {Object} boxData - All the graph object.
 */
function renderFooter(element, boxData) {
  const footer = createDiv();
        footer.className = 'footer';

  const left = renderDeviceInfo('left', boxData, boxData.colors.primary);

  const right = renderDeviceInfo('right', boxData, boxData.colors.secondary);

  footer.append(left);
  footer.append(right);
  element.append(footer);
}

/**
 * Render the device info element for the footer
 * @param {String} side - ('left' or 'right')
 * @param {Object} boxData - All the graph object.
 * @param {String} color - Title color
 * 
 * @returns {Object} - Left or right container
 */
function renderDeviceInfo(side, boxData, color) {
  const sideInfo = boxData[side];
  const container = createDiv();
        container.className = side;
  
  const title = createP();
        title.className = 'footer-title';
        title.innerText = sideInfo.label;
        title.style.color = color;
  const percentage = createSpan();
        percentage.className = 'footer-percentage';
        percentage.innerText = `${sideInfo.percentage}%`;
  const footerValue = createSpan();
        footerValue.className = 'footer-value';
        footerValue.innerText = sideInfo.value;
  
  container.append(title);
  container.append(percentage);
  container.append(footerValue);

  return container;
}

/**
 * Render the card with it's corresponding graph and append this card to the DOM.
 * @param {Object} boxData - The complete graph's info object
 */
function renderBox(boxData) {
  /**
   * I could have also used the DOMParser class with the parseFromString method and pass the whole html as a string
   * Or even used the insertAdjacentHTML and pass something like:
   * `
   *  <div>${label}</div>
   * `
   * But the fastest rendering in javascript is to create the elements manually.
   */
  const element = createDiv();
        element.className = 'card';

  renderCircle(element, boxData);
  renderFooter(element, boxData);
  document.getElementById('main').append(element);
}

async function startApp() {
  const graphsData = await getGraphs();
  graphsData.map(renderBox);
}

startApp();
