const assert = chai.assert;

const mockedData = {
  "title": "REVENUE",
  "total": "200.000€",
  "colors": {
    "primary": "#88D34A",
    "secondary": "#3D6A13"
  },
  "left": {
    "label": "Tablet",
    "percentage": "60",
    "value": "120.000€"
  },
  "right": {
    "label": "Smartphone",
    "percentage": "40",
    "value": "80.000€"
  },
  "history": [4,3,3,5,7,7,6,6,5,7,8,9,8,7,6,5,4,3,2,3,4,3,4]
};

describe('getGraphs', function() {
  it('should make a call to the graph´s API and the data is complete', async function() {
    fetchMock.get('/api/graphs', mockedData);
    const apiResponse = await getGraphs();
    assert.deepEqual(apiResponse, mockedData);
  });
});

describe('renderFooter', function() {
  const footerContainer = createDiv();
  renderFooter(footerContainer, mockedData);
  const footer = footerContainer.childNodes[0];

  it('should have footer and their children', function() {
    assert.equal(footer.className, 'footer');
    assert.equal(footer.childNodes[0].className, 'left');
    assert.equal(footer.childNodes[1].className, 'right');
  });

  it('should have left container with correct data', function() {
    const left = footer.childNodes[0];
    assert.equal(left.childNodes[0].className, 'footer-title');
    assert.equal(left.childNodes[0].innerText, 'Tablet');
    assert.equal(left.childNodes[1].className, 'footer-percentage');
    assert.equal(left.childNodes[1].innerText, '60%');
    assert.equal(left.childNodes[2].className, 'footer-value');
    assert.equal(left.childNodes[2].innerText, '120.000€');
  });

  it('should have left correct color', function() {
    const left = footer.childNodes[0];
    assert.equal(left.childNodes[0].style.color, 'rgb(136, 211, 74)');
  });

  it('should have right container with correct data', function() {
    const right = footer.childNodes[1];
    assert.equal(right.childNodes[0].className, 'footer-title');
    assert.equal(right.childNodes[0].innerText, 'Smartphone');
    assert.equal(right.childNodes[1].className, 'footer-percentage');
    assert.equal(right.childNodes[1].innerText, '40%');
    assert.equal(right.childNodes[2].className, 'footer-value');
    assert.equal(right.childNodes[2].innerText, '80.000€');
  });

  it('should have right correct color', function() {
    const right = footer.childNodes[1];
    assert.equal(right.childNodes[0].style.color, 'rgb(61, 106, 19)');
  });
});

describe('renderCircle', function() {
  const element = createDiv();
  renderCircle(element, mockedData, 0);
  const donut = element.childNodes[0];

  it('should have donut and their children', function() {
    assert.equal(donut.className, 'donut');
    const donutCase = donut.childNodes[0];
    const donutText = donut.childNodes[1];
    assert.equal(donutCase.className, 'donut-case');
    assert.equal(donutCase.childNodes[0].className, 'before');
    assert.equal(donutCase.childNodes[1].className, 'after');
    assert.equal(donutText.className, 'donut-text');
    const center = donutText.childNodes[0];
    assert.equal(center.className, 'center');
    assert.equal(center.childNodes[0].className, 'title');
    assert.equal(center.childNodes[1].className, 'total-value');
  });

  it('should have donut case with correct values at before', function() {
    const before = donut.childNodes[0].childNodes[0];
    assert.equal(before.style.backgroundColor, 'rgb(61, 106, 19)');
    assert.equal(before.style.transform, 'rotate(144deg)');
  });

  it('should have donut case with correct values at after', function() {
    const after = donut.childNodes[0].childNodes[1];
    assert.equal(after.style.backgroundColor, 'rgb(136, 211, 74)');
    assert.equal(after.style.transform, 'rotate(360deg)');
  });

  it('should have donut text with correct text', function() {
    const center = donut.childNodes[1].childNodes[0];
    assert.equal(center.childNodes[0].innerText, 'REVENUE');
    assert.equal(center.childNodes[1].innerText, '200.000€');
  });
});

describe('renderAreaChart', function() {
  it('should have an svg with black color', function() {
    const containerId = 'areaTestContainer';
    const element = createDiv();
          element.id = containerId;
          element.style.display = 'none';
    document.getElementById('main').append(element);
    renderAreaChart(`#${containerId}`, mockedData, 'black');
    assert.equal(element.childNodes[0].tagName.toLowerCase(), 'svg');
    assert.equal(element.childNodes[0].style.fill, 'black');
  });
});
