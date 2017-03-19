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

function replaceChildNodes(node) {
    if (node.parentNode && node.nodeType === 3) {
        var text = node.nodeValue;
        var replacedText = text.replace(/business/gi, matchBurritoCase);

        if (replacedText !== text) {
            node.parentNode.replaceChild(document.createTextNode(replacedText), node);
        }
    }
    Array.prototype.forEach.call(node.childNodes, replaceChildNodes);
}

if (!MutationObserver) {
    // if MutationObserver is not supported, run it once on the document body
    replaceChildNodes(document.body);
} else {
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (!mutation.addedNodes) return;

            mutation.addedNodes.forEach(replaceChildNodes);
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
