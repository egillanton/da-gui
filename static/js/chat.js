var final_transcript = '';
var recognizing = false;
var start_timestamp;

if (!('webkitSpeechRecognition' in window)) {
    console.log("webkitSpeechRecognition not found!");
} else {
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = false; //  when the user stops talking, speech recognition will end
    recognition.interimResults = true;
    recognition.lang = 'is-IS';

    recognition.onstart = function () {
        $("#btn-startButton").prop('value', '"Hætta Upptöku"');
        recognizing = true;
        final_transcript = '';
        showInfo('info_speak_now');
        start_timestamp = event.timeStamp;
    };
    recognition.onend = function () {
        recognizing = false;
        $("#btn-startButton").prop('value', '"Taka upp"');
        if (final_transcript) {
            $("#input_text").val("");
            $("#input_text").val(capitalize(final_transcript));
            showInfo('');
        } else {
            showInfo('info_start');
        }
        enableButtons();
    };
    recognition.onresult = function (event) {
        var interim_transcript = '';
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
                final_transcript += event.results[i][0].transcript;
            } else {
                interim_transcript += event.results[i][0].transcript;
            }
        }
        $("#input_text").val(interim_transcript);
    };
    recognition.onerror = function (event) {
        recognizing = false;
        final_transcript = "";
        if (event.error == 'no-speech') {
            showInfo('info_no_speech');
        }
        if (event.error == 'audio-capture') {
            showInfo('info_no_microphone');
        }
        if (event.error == 'not-allowed') {
            if (event.timeStamp - start_timestamp < 100) {
                showInfo('info_blocked');
            } else {
                showInfo('info_denied');
            }
        }
    };
}

var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function (m) { return m.toUpperCase(); });
}

function showInfo(s) {
    if (s) {
        for (var child = info.firstChild; child; child = child.nextSibling) {
            if (child.style) {
                child.style.display = child.id == s ? 'block' : 'none';
            }
        }
        info.style.visibility = 'visible';
    } else {
        info.style.visibility = 'hidden';
    }
}

function addTextToList(text, left) {
    var list = document.getElementsByTagName("UL")[0]; // find the chat dialog <ul>
    var node = document.createElement("LI");
    var newDiv = document.createElement("DIV");
    var userIcon = document.createElement("I");  // Icon
    var newP = document.createElement("P");
    var textnode = document.createTextNode(text);
    newP.appendChild(textnode);

    // Add style 
    if (left) {
        userIcon.classList.add("fas");
        userIcon.classList.add("fa-user-tie");
        node.classList.add("left-chat");
    } else {
        userIcon.classList.add("fas");
        userIcon.classList.add("fa-user-circle");
        node.classList.add("right-chat");
    }

    newDiv.appendChild(userIcon);
    newDiv.appendChild(newP);
    node.appendChild(newDiv); // Append the text to <li>
    list.appendChild(node); // Append <li> to <ul>
}

function disableButtons() {
    $("#btn-send").attr("disabled", true);
}

function enableButtons() {
    $("#btn-send").attr("disabled", false);
    $("#btn-startButton").attr("disabled", false);
}

function clearText() {
    $("#input_text").val("");
    $("#input_text").prop('placeholder', '');
}

function send() {
    if ($("#input_text").val()) {
        var text = $("#input_text").val();
        $("#btn-send").attr("disabled", true);
        $("#btn-startButton").attr("disabled", true);
        addTextToList(text, false); // keep right
        clearText();
        $("#input_text").attr("readonly", true);
        showInfo('info_wait');
        $.ajax({
            type: 'POST',
            url: "/ask",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify({
                "q": final_transcript,
            }),
            success: function (res) {
                var text = res.response;
                addTextToList(text, true);
            },
            error: function (error) {
                console.log(error);
            },
            complete: function (data) {
                enableButtons();
                clearText();
                $("#input_text").attr("readonly", false);
                showInfo('');
            }
        });
    }
}

function startButton(event) {
    if (recognizing) {
        recognition.stop();
        return;
    }
    final_transcript = '';
    disableButtons();
    start_timestamp = event.timeStamp;
    recognition.start();
}


$(document).ready(function () {
    console.log("ready!");

});