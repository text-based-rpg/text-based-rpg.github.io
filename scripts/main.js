import {situations} from "./situations.js";

window.onload = introduction()

let situation = 0
let code = ""

function introduction() {
  displayText("Blabla") //TODO
  createNextButton()
}

function end() {
  displayText("Blabla") //TODO display link to questionnaire & code + instructions
}

function createNextButton() {
  let ul = document.getElementById("game-choices")
  clearChildrenOf(ul)  //clear buttons if there were buttons before
  ul.appendChild(getButton("Continue", () -> nextSituation())) //create new button
}

function clearChildrenOf(el) {
  const children = el.children
  if(children) {
    children.forEach(child => el.removeChild(child));
  }
}

function getButton(text, clickReaction) {
  let b = document.createElement("button")

  const t = document.createTextNode(text)
  b.appendChild(t)

  b.value = value
  b.onclick = clickReaction

  return b
}

function nextSituation() {
  if(!situations.hasOwnProperty(situation) {
    end()
  }
  displayText(situations[situation].text)
  createOptionButtons(situations[situation].options)
  situation++
}

function displayText(text) {
  let p = document.getElementById("game-text")
  clearChildrenOf(p) //clear text if there was text before
  const t = document.createTextNode(text) //create new text
  p.appendChild(t);
}

function createOptionButtons(options) {
  let ul = document.getElementById("game-choices")
  clearChildrenOf(ul)  //clear buttons if there were buttons before
  options.foreach(s -> {  //create new buttons
    ul.appendChild(getButton(s.text, () -> {
      updateCode(s.scala, s.value)
      displayText(s.response)
      createNextButton()
    }))
  })
}

function updateCode(scala, value) {
  //TODO
}
