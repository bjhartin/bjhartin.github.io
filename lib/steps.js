var steps = 1;

function answerDiv() {
    return document.getElementById('answers');
}

function problemNumber() {
    return document.getElementById("problemNumber").textContent;
}

function screenshot() {
    html2canvas(document.body).then(function (canvas) {
        var screenShotName = 'RSM-Problem';
        letterRendering: true;
        console.info(problemNumber());
        if(problemNumber().length != 0) {
          screenShotName = screenShotName + '-' + problemNumber();
        }
        saveAs(canvas.toDataURL(), screenShotName + '.png');
    });
}

function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

function enableEquation(id, lastContent) {
    var element = document.getElementById(id);
    element.editor = new MathEditor(id);
    element.editor.setTemplate('floating-toolbar');
    element.editor.setLatex(lastContent);
}

function answerId(step) {
    return 'answer' + step;
}

function answerElement(step) {
    return document.getElementById(answerId(step));
}

function getLatex(step) {
    return answerElement(step).editor.answerMathField.latex();
}

function addEquation() {
    var latex = getLatex(steps);
    steps = steps + 1;
    var newId = answerId(steps);
    var div = answerDiv();
    var span = document.createElement("span");
    div.appendChild(span);
    span.id = newId;
    enableEquation(newId, latex);
}

function removeLastEquation() {
    if(steps > 1) {
        id = answerId(steps);
        var element = document.getElementById(id);
        element.remove();
        steps = steps - 1;
    }
}

function handleKeyPress(event) {
    if (event.ctrlKey && event.altKey && ((("key" in event) && (event.key === "-")) || (event.keyCode === 189))) {
        removeLastEquation();
    } else if (event.ctrlKey && event.altKey && ((("key" in event) && (event.key === "+")) || (event.keyCode === 187))) {
        addEquation();
    } else if (event.ctrlKey && event.altKey && ((("key" in event) && (event.key === "S")) || (event.keyCode === 83))) {
        screenshot();
    }
}

document.onkeyup = handleKeyPress;