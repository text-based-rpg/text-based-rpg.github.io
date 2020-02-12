import {situations} from "./situations.js";

window.onload = introduction()

let situation = 0
let code = ""

/* Functions for game play */

function introduction() {
  displayInstructions("Welcome to TITLE! We want to make this game a good experience for our target groups."
  + "For that we need your help. Please play this game and fill out our questionnaire afterwards.") //Add title
  displayText("Blabla") //TODO add intro text
  createNextButton()
}

function nextSituation() {
  if(situation == 0) removeTextFromElement("instructions")
  if(!situations.hasOwnProperty(situation)) {
    end()
  }
  displayText(situations[situation].text)
  createOptionButtons(situations[situation].options)
  situation++
}

function end() {
  removeTextFromElement("instructions")
  displayInstructions("Thank you for playing! Please help us improve our game by answering a few questions!"
  + "In order to do so, please copy the code displayed below,"
  + "open the questionnaire by clicking on the button (opens in a new tab)"
  + "and paste the code into the appropriate field on the first page of the questionnaire.")
  displayInstructions(code, "code", True)
  addLink("https://example.com", "Magically take me to the questionnaire") //TODO Update link
}

function updateCode(scala, value) {
  //TODO
}

/* DOM manipulation helpers */

function removeTextFromElement(id) {
  let p = document.getElementById(id)
  clearChildrenOf(p)
}

function displayTextOnElement(id, text, className, justAdd) {
  let p = document.getElementById(id)
  
}

function displayInstructions(text, className, justAdd) {
  let p = document.getElementById("instructions")
  if(!justAdd) clearChildrenOf(p) //clear text if there was text before & if not just adding text
  if(!text) return
  const t = document.createTextNode(text) //create new text
  if(className) t.classList.add(className);
  p.appendChild(t)
}

function displayText(text) {
  let p = document.getElementById("game-text")
  clearChildrenOf(p) //clear text if there was text before & if not just adding text
  if(!text) return
  const t = document.createTextNode(text) //create new text
  p.appendChild(t)
}

function clearChildrenOf(el) {
  const children = el.childNodes;
  if(children && children.length > 0) {
    children.forEach(child => el.removeChild(child));
  }
}

function addLink(url, text) {
  let p = document.getElementById("game-text")
  let a = document.createElement("a")
  a.href=url
  a.text = (text) ? text : url
  a.target="_blank"
  a.classList.add("button");
  p.append(a)
}

/* Buttons */

function createNextButton() {
  let ul = document.getElementById("game-choices")
  clearChildrenOf(ul)  //clear buttons if there were buttons before
  ul.appendChild(getButton("Continue", () => nextSituation())) //create new button
}

function createOptionButtons(options) {
  let div = document.getElementById("game-choices")
  clearChildrenOf(div)  //clear buttons if there were buttons before
  options.forEach(s => {  //create new buttons
    div.appendChild(getButton(s.text, () => {
      updateCode(s.scala, s.value)
      displayText(s.response)
      createNextButton()
    }))
  })
  div.classList.add("button-collection");
}

function getButton(text, clickReaction) {
  let b = document.createElement("button")

  const t = document.createTextNode(text)
  b.appendChild(t)

  // b.value = value;
  b.onclick = clickReaction
  b.classList.add("button");

  return b
}
