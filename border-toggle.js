// ----------------------------
// SETTINGS
// ----------------------------

const outlineVal = "2px solid red !important";

// ----------------------------
// START UP
// ----------------------------

let button = document.createElement("button");
let overlay = document.createElement("div");
let overlayEnabled = false;
const body = document.body;

// ----------------------------
// EVENT HANDLERS
// ----------------------------

window.onload = function () {
  this.addToggleButton();
  this.addOverlayDiv();
  this.clonePageElements();
};

button.onclick = function () {
  if (overlayEnabled === false) {
    // attach the inspector div after the page body
    body.after(overlay);
    // set button to enabled color
    button.style.backgroundColor = "rgba(68, 235, 187, 0.5)";
    overlayEnabled = true;
  } else {
    // remove overlay from the document
    overlay.remove();
    // set button to inactive color
    button.style.backgroundColor = "white";
    overlayEnabled = false;
  }
};

// ----------------------------
// FUNCTIONS
// ----------------------------

function addToggleButton() {
  // button for toggling inspector view
  button.id = "toggle-button";
  let buttonText = document.createTextNode("Toggle Borders");
  button.appendChild(buttonText);
  // set button syle, & z-index of button > z-index of div to always show it on top
  button.style.cssText = ` margin: 20px; 
    position: absolute; 
    top: 0; 
    left: 0; 
    height: 100px; 
    width: 100px; 
    color: black; 
    background-color: white; 
    border: 3px solid black; 
    border-radius: 10px; 
    font-size: 20px; 
    z-index: 999;
  `;
  // add button after the body of the document
  body.after(button);
}

function addOverlayDiv() {
  // define the div that will show when we click the toggle button
  overlay.id = "inspector-div";
  overlay.style.cssText = `
    box-sizing: border-box;
    position: absolute; 
    top: 0; 
    left: 0; 
    height: 100vh;
    width: 100vw;
    border: none; 
    background-color: rgba(245, 245, 245, 0.8); 
    z-index: 998;
  `;
}

function clonePageElements() {
  let cloneBody = document.importNode(document.body, true);
  let clonedBodyElements = [...(cloneBody.querySelectorAll('*'))];
  console.log(clonedBodyElements);

  for (let i = 0; i < clonedBodyElements.length; i++ ) {
    let thisNode = clonedBodyElements[i];
    thisNode.style.backgroundColor = "transparent";
    thisNode.style.outline = outlineVal;
    thisNode.style.color = "transparent";
  }

  addOverlayStyles(cloneBody);
  overlay.appendChild(cloneBody);
}

function addOverlayStyles(clonedNode) {
  clonedNode.style.outline = outlineVal;
  clonedNode.style.backgroundColor = "transparent";
  clonedNode.style.boxSizing = "border-box";
}

function addToOverlay(node) {
  overlay.appendChild(node);
}
