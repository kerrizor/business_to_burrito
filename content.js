"use strict";

function matchCase(text, pattern) {
    var result = '';

    for (var i = 0; i < text.length; i++) {
        var c = text.charAt(i);
        var p = pattern.charCodeAt(i);

        if (p >= 65 && p < 65 + 26) {
            result += c.toUpperCase();
        } else {
            result += c.toLowerCase();
        }
    }

    return result;
}

function matchBurritoCase(match) {
    return matchCase("burrito", match);
}

var elements = document.querySelectorAll("body :not(script):not(input)");

[].forEach.call(elements, function (element) {
    [].forEach.call(element.childNodes, function (node) {
        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/business/gi, matchBurritoCase);

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }
    });
});

