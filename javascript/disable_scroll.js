// ==UserScript==
// @name Disable space bar scrolling
// @namespace Disable Space bar scroll
// @version 0.1
// @description disable space bar scroll
// @author Space bar scroll
// @match *
// @grant none
// ==/UserScript==

(function () {
    let k = function (action) {
        let eventObj = document.createEvent("Events");

        eventObj.initEvent("keydown", true, true);
        eventObj.keyCode = 75;
        eventObj.which = 75;

        document.body.dispatchEvent(eventObj);
    };

    let killSpaceBar = function (evt) {

        let target = evt.target || {},
            isInput = ("INPUT" == target.tagName || "TEXTAREA" == target.tagName || "SELECT" == target.tagName || "EMBED" == target.tagName);

// if we’re an input or not a real target exit
        if (isInput || !target.tagName) return;

// if we’re a fake input like the comments exit
        if (target && target.getAttribute && target.getAttribute('role') === 'textbox') return;

// ignore the space and send a ‘k’ to pause
        if (evt.keyCode === 32) {
            evt.preventDefault();
            k();
        }
    };

    document.addEventListener("keydown", killSpaceBar, false);

})();