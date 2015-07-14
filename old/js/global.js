/*jslint eqeq: true*/
/*jshint unused: false, undef:false */

// ----------------------------------------------------------
// #########################################################
// START -- Functions that decide what html page to load
// #########################################################
// ----------------------------------------------------------

// -------------------------------------
// loadPopups is called inside loadPage()

function loadPopups(f) {
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xmlhttp.open("GET", "/pages/popups.html", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //calls function f back to loadPage() as "response" and prints innerHTML
            f(xmlhttp.responseText, xmlhttp);
        }
    };
    xmlhttp.send('');
    return xmlhttp;
}

// -------------------------------------
// change <meta> tag depending on page

function setMetaTag(content) {
    console.log("content:",content);
    var viewport = document.querySelector("meta[name=description]");
    console.log("viewport:",viewport);
    console.log("viewportkajsaanka:",viewport);

    viewport.setAttribute('content', content + " - Albin Daleby Web Developer");
}

// -------------------------------------
// change <title> tag depending on page

function setTitleTag(title) {
    document.title = title + " - Bytewize AB";
}

// -------------------------------------
// load 404 page if loadPage() failed

function loadFourOFour(f) {
    setMetaTag("404: Page not found");
    setTitleTag("404: Page not found");
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xmlhttp.open("GET", "/pages/404.html", true);
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //calls function f back to loadPage() as "response" and prints innerHTML
            f(xmlhttp.responseText, xmlhttp);
        }
    };
    xmlhttp.send('');
    return xmlhttp;
}

// -------------------------------------
// loadHTML is called inside loadPage()

function loadHTML(url, hash, f) {
    if (url === "about") {
        setMetaTag("About");
        setTitleTag("About");
    }
    var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    if (url === "") {
        xmlhttp.open("GET", "/pages/home.html", true);
    } else {
        xmlhttp.open("GET", "/pages/" + url + ".html", true);
    }
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            if (xmlhttp.responseText !== "") {
                //calls function f back to loadPage() as "response" and prints innerHTML
                f(xmlhttp.responseText, xmlhttp);
            }
        }
    };
    xmlhttp.send('');
    return xmlhttp;
}

// -------------------------------------
// loadPage is first called. then calls the loadPage and loadPopups function and gets reponse with the right HTML

function loadPage() {
    (function(window, undefined) {
        var State = History.getState(),
        filename = State.hash.replace(/\//g, '');
        filename = filename.replace(/\./g, '');
        var n = filename.indexOf('?');
        filename = filename.substring(0, n != -1 ? n : filename.length);
        //load CONTENT depending on URL
        loadHTML(filename, "", function(response) {
            if (response.indexOf("<!DOCTYPE") >= 0) {
                // load 404 PAGE NOT FOUND
                loadFourOFour(function(response) {
                    console.log(response);
                    console.log("page load");
                    document.getElementById('content').innerHTML = response;
                });
            } else {
                // load HTML
                document.getElementById('content').innerHTML = response;
            }
        });
        //load POPUPS.
        loadPopups(function(response) {
            document.getElementById('popupContainer').innerHTML = response;
            // getIndex();
        });

    })(window);
}

// ----------------------------------------------------------
// #########################################################
// END -- Functions that decide what html page to load
// #########################################################
// ----------------------------------------------------------

// -------------------------------------
// loadPage is first called. then calls the loadPage and loadPopups function and gets reponse with the right HTML

