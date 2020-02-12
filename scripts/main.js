import {situations} from "./situations.js";

window.onload = introduction()

let currentSituation = 0
let code = ""

/* Functions for game play */

function introduction() {
    displayText("Welcome to TITLE! We want to make this game a good experience for our target groups."
        + "For that we need your help. Please play this game and fill out our questionnaire afterwards.");
    createContinueButton()
}

function nextSituation() {
    if (currentSituation >= situations.length) {
        end();
        return;
    }
    clearText();
    clearOptions();
    displayText(situations[currentSituation].text)
    displayOptions(situations[currentSituation].options)
    currentSituation++
}

function end() {
    clearText();
    clearOptions();
    displayText("Thank you for playing! Please help us improve our game by answering a few questions!\n"
        + "In order to do so, please copy the code displayed below,"
        + "open the questionnaire by clicking on the button (opens in a new tab)"
        + "and paste the code into the appropriate field on the first page of the questionnaire.")
    displayText(code);
    addLink("https://example.com", "Magically take me to the questionnaire") //TODO Update link
}

function updateCode(value) {
    code += value;
}

/* DOM manipulation helpers */


function clearText() {
    let p = document.getElementById("game-text")
    clearChildrenOf(p) //clear text if there was text before & if not just adding text
}

function displayText(text) {
    let gameText = document.getElementById("game-text");
    if (!text) return;
    const p = document.createElement("p");
    const t = document.createTextNode(text); //create new text
    p.appendChild(t)
    gameText.appendChild(p);
}

function clearOptions(){
    let gameChoiceDiv = document.getElementById("game-choices")
    clearChildrenOf(gameChoiceDiv)  //clear buttons if there were buttons before
}

function clearChildrenOf(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function addLink(url, text) {
    let gameTextDiv = document.getElementById("game-text")
    let a = document.createElement("a")
    a.href = url
    a.text = (text) ? text : url
    a.target = "_blank"
    a.classList.add("button");
    gameTextDiv.append(a)
}

/* Buttons */

function createContinueButton() {
    let ul = document.getElementById("game-choices")
    ul.appendChild(createButton("Continue", () => nextSituation())) //create new button
}

function displayOptions(options) {
    let gameChoiceDiv = document.getElementById("game-choices")
    clearChildrenOf(gameChoiceDiv)  //clear buttons if there were buttons before
    options.forEach(s => {  //create new buttons
        gameChoiceDiv.appendChild(createButton(s.text, () => {
            updateCode(s.value);
            nextSituation();
        }))
    })
    gameChoiceDiv.classList.add("button-collection");
}

function createButton(text, clickReaction) {
    let b = document.createElement("button")

    const t = document.createTextNode(text)
    b.appendChild(t)

    // b.value = value;
    b.onclick = clickReaction
    b.classList.add("button");

    return b
}
