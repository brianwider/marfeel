/**
 * P helper - Returns an empty p element
 * @returns {Object} p element
 */
function createP() {
  return document.createElement('p');
}

/**
 * Span helper - Returns an empty span element
 * @returns {Object} span element
 */
function createSpan() {
  return document.createElement('span');
}

/**
 * Div helper - Returns an empty div element
 * @returns {Object} div element
 */
function createDiv() {
  return document.createElement('div');
}

/**
 * In a bundled javascript file, i would export the helpers and use it in the home.js the following way:
 * const { createDiv, createP, createSpan } = require('./helpers');
 * 
 * The export would be:
 * module.exports = {
 *   createDiv,
 *   createP,
 *   createSpan
 * }
 */