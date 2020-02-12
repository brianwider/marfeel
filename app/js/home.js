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
        <div class='error-container'>
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
function renderCircle(element, { title, total, colors, right }, index) {
  const degree = (right.percentage / 100 * 360);
  const donut = createDiv();
        donut.className = 'donut';

  const percentage = createDiv();
        percentage.className = 'donut-case';
        percentage.style.backgroundColor = colors.primary;

  const text = createDiv();
        text.className = 'donut-text';
        text.id = `donut-text-${index}`;

  const before = createDiv();
        before.className = 'before';
        before.style.backgroundColor = colors.secondary;
  const after = createDiv();
        after.className = 'after';
        after.style.backgroundColor = colors.secondary;
        after.style.transform = `rotate(${degree}deg)`;
  
  // If the degree will be less than 180 (Or percentage less than 50), 'invert roles' on before and after
  if (right.percentage < 50) {
    after.style.backgroundColor = colors.primary;
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

function renderAreaChart(containerId, data, color) {
  const width = 250, height = 130;

  const x = d3.scale.linear()
    .range([0, width])
    .domain([0, data.length -1]);

  const y = d3.scale.linear()
    .range([height, 0])
    .domain([0, 10]);

  const line = d3.svg.area()
    .x(function(d, i) { return x(i); })
    .y1(function(d) { return y(d); })
    .y0(height)
    .interpolate('cardinal');

  const svg = d3.select(containerId).append('svg')
    .attr('width', width + 60)
    .attr('height', height + 50)
    .style('margin-left', '-50px')
    .style('margin-top', '2px')
    .style('fill', color)
    .attr('fill-opacity', '0.3')
    .append('g')
    .attr('transform', 'translate(50, 10)')

    svg.append('path')
      .datum(data)
      .attr('class', 'line')
      .style('stroke', color)
      .style('stroke-opacity', 1)
      .attr('d', line);
}

/**
 * Render the card with it's corresponding graph and append this card to the DOM.
 * @param {Object} boxData - The complete graph's info object
 */
function renderBox(boxData, index) {
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

  renderCircle(element, boxData, index);
  renderFooter(element, boxData);
  document.getElementById('main').append(element);
  renderAreaChart(`#donut-text-${index}`, boxData.history, boxData.colors.primary);
}

async function startApp() {
  const graphsData = await getGraphs();
  graphsData.map(renderBox);
}

startApp();
