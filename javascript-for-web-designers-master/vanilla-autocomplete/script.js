/*
 * - Define variables
 * - Focus the input
 * - Add event listener for the input keyup and keydown
 * - Define a function for checking if the input value matches any of the country names
 * - Define a function for displaying autocomplete results
 * - Define a function for moving the cursor in the results list
 * - Define a function for toggling the results list
 */

var targetInput = document.getElementById("country"),
    results = document.getElementById("autocomplete-results"),
    countryList = ['Albania', 'Colombia', 'Cuba', 'El Salvador', 'Jordan', 'Kenya', 'Nepal', 'Romenia', 'Sri Lanka', 'Wales'],
    matches = [],
    resultsCursor = 0;

// Focus input
targetInput.focus();

// Add event key down
targetInput.addEventListener("keydown", function (event){
    if (event.keyCode == "13") {
        event.preventDefault();
    }
});

// Add event listener
targetInput.addEventListener("keyup", function(event){
    results.innerHTML = "";
    toggleResults("hide");

    if (this.value.length > 0){
        matches = getMatches(this.value);
        if (matches.length > 0) {
            displayMatches(matches);
        }
    }

    if (results.classList.contains("visible")){
        switch(event.keyCode) {
            case 13:
                targetInput.value = results.children[resultsCursor].innerHTML;
                toggleResults('hide');
                resultsCursor = 0;

                break;
            case 38:
                if (resultsCursor > 0) {
                    resultsCursor--;

                    moveCursor(resultsCursor);
                }

                break;
            case 40:
                if (resultsCursor < (matches.length - 1)) {
                    resultsCursor++;

                    moveCursor(resultsCursor);
                }

                break;
        }
    }

});

// Define function toggle
function toggleResults(action) {
    if (action == "show"){
        results.classList.add("visible");
    } else if (action == "hide") {
        results.classList.remove("visible");
    }
}

// Define function check
function getMatches(inputText){
    var matchList = [];

    for (var i = 0; i < countryList.length; i++) {
        if (countryList[i].toLowerCase().indexOf(inputText.toLowerCase())!= -1 ){
            matchList.push(countryList[i]);
        }
    }
    return matchList;
}


// Define function display
function displayMatches(matchList) {
    var j =0;
    while (j < matchList.length){
        results.innerHTML += '<li class="result">' + matchList[j] + '</li>';
        j++;
    }
    moveCursor(resultsCursor);
    toggleResults("show");
}

// Define function moving
function moveCursor(pos) {
    for (var x = 0; x < results.children.length; x++) {
        results.children[x].classList.remove('highlighted');
    }

    results.children[pos].classList.add('highlighted');
}