
let situations = []
let startText = ""
let endOptions = {}
fetch("assets/situations.json")
    .then(response => response.json())
    .then(json => {
        situations = json.situations
        startText = json.start
        endOptions = json.end
    })

let currentSituation = -1

let Empathie = 0
let Verantwortungsbewusstsein = 0
let Ordnung = 0

let code = ""
const buttonSymbol = "> "

window.onload = introduction()

/* Functions for game play */

function introduction() {
    displayText("Welcome to Fairytale Adventure! We want to make this game a good experience for our target groups. "
        + "For that we need your help. Please play this game and fill out our questionnaire afterwards.");
    createContinueButton()
}

function displayResult(answer) {
    clearText();
    clearOptions();
    if (answer !== null) {
        displayText(situations[currentSituation -1].options[answer].result)
    }
    createContinueButton()
}

function nextSituation() {
    if (currentSituation > situations.length) {
        forwarding();
        return;
    } else if ( currentSituation === situations.length) {
        end();
        currentSituation++
        return;
    } else if (currentSituation < 0){
        begin();
        currentSituation++
        return;
    }
    const situation = situations[currentSituation]
    displayText(situation.text)
    displayOptions(situation.options, situation.scale)
    currentSituation++
}

function begin(){
    displayText(startText);
    createContinueButton();
}

function end() {
    let text = ''
    if (Empathie > Ordnung && Empathie > Verantwortungsbewusstsein) {
        text = endOptions.Empathie
    } else if (Ordnung > Empathie && Ordnung > Verantwortungsbewusstsein) {
        text = endOptions.Ordnung
    } else {
        text = endOptions.Verantwortungsbewusstsein
    }
    clearText();
    clearOptions();
    displayText(text)
    createContinueButton();
}

function forwarding() {
    clearText();
    displayText("Thank you for playing Fairytale Adventure! Please help us improve our game by answering a few questions!\n"
        + "In order to do so, please copy the code displayed below, "
        + "open the questionnaire by clicking on the button (opens in a new tab) "
        + "and paste the code into the appropriate field on the first page of the questionnaire.")
    displayCode(code);
    addLink("https://www.soscisurvey.de/textrpg/", "Magically take me to the questionnaire")
}

function updateCode(value) {
    code += value;
}

function updateScale(value, scale) {
    switch (scale) {
        case 'Ordnung':
            Ordnung += value
            break;
        case 'Verantwortungsbewusstsein':
            Verantwortungsbewusstsein += value
            break;
        case 'Empathie':
            Empathie += value
            break;
    }
}

/* DOM manipulation helpers */
function clearText() {
    let p = document.getElementById("game-text")
    clearChildrenOf(p) //clear text if there was text before & if not just adding text
}

function displayText(text) {
    if (!text) return;
    let gameText = document.getElementById("game-text");
    const p = document.createElement("p");
    const t = document.createTextNode(text); //create new text
    p.appendChild(t)
    gameText.appendChild(p);
}

function displayCode(code) {
  if (!code) return;
  let gameText = document.getElementById("game-text");

  const d = document.createElement("div");

  // display the code
  const p = document.createElement("p");
  const t = document.createTextNode(code);
  p.appendChild(t)
  p.id = "toCopy"
  d.appendChild(p);

  // add a button that copies the code
  let b = getCopyButton() //create copy button
  b.id = "copyButton"
  d.append(b)

  d.classList.add("code-collection")

  gameText.appendChild(d)
}

function addLink(url, text) {
    let gameTextDiv = document.getElementById("game-text")
    let a = document.createElement("a")
    a.href = url
    a.text = (text) ? buttonSymbol + text : url
    a.target = "_blank"
    a.classList.add("button");
    gameTextDiv.append(a)
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

/* Buttons */
function createContinueButton() {
    let ul = document.getElementById("game-choices")
    ul.appendChild(createButton("Continue", () => {
        clearText()
        clearOptions()
        nextSituation()
    })) //create new button
}

function getCopyButton() {
    return createButton("Copy", () => copyToClipboard())
}

function displayOptions(options, scale) {
    let gameChoiceDiv = document.getElementById("game-choices")
    clearChildrenOf(gameChoiceDiv)  //clear buttons if there were buttons before
    options.forEach((option, index) => {  //create new buttons
        gameChoiceDiv.appendChild(
            createButton(
                option.text,
                () => {
                    updateCode(option.value);
                    updateScale(option.value, scale)
                    displayResult(index);
                }
            )
        )
    })
    gameChoiceDiv.classList.add("button-collection");
}

function createButton(text, clickReaction) {
    let b = document.createElement("button")

    const t = document.createTextNode(buttonSymbol + text)
    b.appendChild(t)

    // b.value = value;
    b.onclick = clickReaction
    b.classList.add("button");

    return b
}

/* Helpers */
function copyToClipboard() {
  // hold code in a textarea to be able to copy it into the clipboard with js
  // https://paulund.co.uk/javascript-copy-and-paste
  let textarea = document.createElement("textarea")
  textarea.value = code
  textarea.setAttribute("readonly", "")
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea)

  textarea.select()
  textarea.setSelectionRange(0, 99999) //for mobile

  try {
      document.execCommand("copy")
      let b = document.getElementById("copyButton")
      clearChildrenOf(b)
      const t = document.createTextNode("Copied")
      b.appendChild(t)
  } catch(err) {
      alert("Sorry, that didn't work! Please try copying the code manually.")
  }

  textarea.remove()
}
