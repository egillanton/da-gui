function addTextToList(text, left) {
    var list = document.getElementsByTagName("UL")[0]; // find the chat dialog <ul>
    var node = document.createElement("LI"); 
    var newDiv = document.createElement("DIV"); 
    var userIcon = document.createElement("I");  // Icon
    var newP = document.createElement("P");
    var textnode = document.createTextNode(text); 
    newP.appendChild(textnode);

    // Add style 
    if(left){
        userIcon.classList.add("fas");
        userIcon.classList.add("fa-user-tie");
        node.classList.add("left-chat");
    }else{
        userIcon.classList.add("fas");
        userIcon.classList.add("fa-user-circle");
        node.classList.add("right-chat")
    }
    
    newDiv.appendChild(userIcon);
    newDiv.appendChild(newP);
    node.appendChild(newDiv); // Append the text to <li>
    list.appendChild(node); // Append <li> to <ul>
}

function disableButtons(){
    $("#button-send").attr("disabled", true);
    $("#button-record").attr("disabled", true);
}

function enableButtons(){
    $("#button-send").attr("disabled", false);
    $("#button-record").attr("disabled", false);
}

function clearText(){
    var inputField = document.getElementsByTagName("input")[0];
    inputField.value = ""
}

function send() {
    var inputField = document.getElementsByTagName("input")[0]; // find the text input
    if(inputField.value){
        var text = inputField.value;
        addTextToList(text, true);
        clearText();
    }
}

function record() {
    disableButtons();
    var text = "Finndu fyrir mig flug til Danmerkur";
    addTextToList(text, false);
    enableButtons();
}

