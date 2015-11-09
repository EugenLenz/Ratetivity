
//Polyfill für endsWith
   
    if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    };
    }


//JS

var xmlHttpObject = false;

if (typeof XMLHttpRequest != 'undefined') 
{
    xmlHttpObject = new XMLHttpRequest();
}
if (!xmlHttpObject) 
{
    try 
    {
        xmlHttpObject = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e) 
    {
        try 
        {
            xmlHttpObject = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch(e) 
        {
            xmlHttpObject = null;
        }
    }
}
              
// Navigieren        
function loadPage(title, url) {
    window.history.pushState(null, title ,url);
    xmlHttpObject.open('get',url);
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
}


var pages = [

{ title : "Index", url : "index.html"},
{ title : "News", url : "News.html"},
{ title : "Events", url : "Events.html"},
{ title : "Clubs", url : "Clubs.html"},
{ title : "Bars", url : "Bars.html"},
{ title : "Rheinoase", url : "Rheinoase.html"},
{ title : "Filmriss", url : "Filmriss.html"},
{ title : "Stars", url : "Stars.html"},
{ title : "Zimmer", url : "Zimmer.html"},
{ title : "Ritzz", url : "Ritzz.html"},
{ title : "Koi", url : "Koi.html"},
 
];

function navigate() {

    for(var i = 0; i < pages.length; ++i) {
        if( document.location.pathname.endsWith(pages[i].url)) {
            loadPage(pages[i].title, pages[i].url);
            return;
        }
    }
    
    loadPage("Index", 'index.html');
}
             
        
/*
function loadContentBars()
{
    window.history.pushState(null, "Bars", "Bars.html");
    xmlHttpObject.open('get','Bars.html');
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
    
   
}
        function loadContentClubs()
{
    window.history.pushState(loadContentClubs, "Clubs", "Clubs.html");
    xmlHttpObject.open('get','Clubs.html');
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
    
}
        function loadContentNews()
{
    window.history.pushState(loadContentNews, "News", "News.html");
    xmlHttpObject.open('get','News.html');
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
    
}
        function loadContentMedia()
{
    window.history.pushState(loadContentMedia, "Media", "Media.html");
    xmlHttpObject.open('get','Media.html');
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
}
        function loadContentEvents()
{
    window.history.pushState(loadContentEvents, "Events", "Events.html");
    xmlHttpObject.open('get','Events.html');
    xmlHttpObject.onreadystatechange = handleContent;
    xmlHttpObject.send(null);
    return false;
}
*/
function handleContent()
{
    if (xmlHttpObject.readyState == 4)
    {
        document.getElementById('myContent').innerHTML = xmlHttpObject.responseText;
    }
}

window.onpopstate = function(event) {
    navigate();
}



//Media functions - Slideshow
 function fade(step) {
            var imgs = document.getElementById("meinFader").getElementsByTagName("img");

            step = step || 0;

            imgs[counter].style.opacity = step/100;
            imgs[counter].style.filter = "alpha(opacity=" + step + ")"; // 

            step = step + 2;

            if (step <= 100) {
                window.setTimeout(function () { fade(step); }, 1);
            } else {
                window.setTimeout(next, 2000);
            }
        }

        function next() {
            var imgs = document.getElementById("meinFader").getElementsByTagName("img");

            if (typeof(counter) != "number") {
                counter = 0;
            }

            counter++;

            if (counter < imgs.length) {
                fade();
            }
        };

//Kalendar
// dm und dj sind Monat und Jahr, die im Kalender dargestellt werden
// insbesondere könnte auch ein Monat gewählt werden, in dem das aktuelle Datum nicht vorkommt
var d = new Date();
var dm = d.getMonth() + 1;
var dj = d.getYear() + 1900;
Kalender(dm, dj);

function Kalender(Monat, Jahr) {
	Monatsname = new Array("Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember");
	Tag = new Array("Mo", "Di", "Mi", "Do", "Fr", "Sa", "So");
	// aktuelles Datum für die spätere Hervorhebung ermitteln
	var jetzt = new Date();
	var DieserMonat = jetzt.getMonth() + 1;
	var DiesesJahr = jetzt.getYear() + 1900;
	var DieserTag = jetzt.getDate();
	// ermittle Wochentag des ersten Tags im Monat halte diese Information in Start fest
	var Zeit = new Date(Jahr, Monat - 1, 1);
	var Start = Zeit.getDay();
	if (Start > 0) {
		Start--;
	} else {
		Start = 6;
	}
	// die meisten Monate haben 31 Tage...
	var Stop = 31;
	// ...April (4), Juni (6), September (9) und November (11) haben nur 30 Tage...
	if (Monat == 4 || Monat == 6 || Monat == 9 || Monat == 11) --Stop;
	// ...und der Februar nur 28 Tage...
	if (Monat == 2) {
		Stop = Stop - 3;
		// ...außer in Schaltjahren
		if (Jahr % 4 == 0) Stop++;
		if (Jahr % 100 == 0) Stop--;
		if (Jahr % 400 == 0) Stop++;
	}
	var tabelle = document.getElementById('kalender');
	// schreibe Tabellenüberschrift
	var Monatskopf = Monatsname[Monat - 1] + " " + Jahr;
	var caption = tabelle.createCaption();
	caption.innerHTML = Monatskopf;
	// schreibe Tabellenkopf
	var row = tabelle.insertRow(0);
	for (var i = 0; i <= 6; i++) {
		var cell = row.insertCell(i);
		cell.innerHTML = Tag[i];
	}
	// ermittle Tag und schreibe Zeile
	var Tageszahl = 1;
	for (var i = 0; i <= 4; i++) {
		var row = tabelle.insertRow(1 + i);
		for (var j = 0; j <= 6; j++) {
			// Zellen vor dem Start-Tag in der ersten Zeile und Zeilen nach dem Stop-Tag werden leer aufgefüllt
			if (((i == 0) && (j <= 5) && (j < Start)) || (Tageszahl > Stop)) {
				var cell = row.insertCell(j);
				cell.innerHTML = ' ';
			} else {
				// normale Zellen werden mit der Tageszahl befüllt und mit der Klasse Kalendertag markiert
				var cell = row.insertCell(j);
				cell.innerHTML = Tageszahl;
				cell.className = 'kalendertag'
					// und der aktuelle Tag (heute) wird noch einmal speziell mit der Klasse "heute" markiert
				if ((Jahr == DiesesJahr) && (Monat == DieserMonat) && (Tageszahl ==
						DieserTag)) {
					cell.className = cell.className + ' heute';
				}
				Tageszahl++;
			}
		}
	}
}

function KalenderVor() {
    if(dm==12) {
        dm=1;
        dj++;
    }else
        dm++;
    var neuerKalender = Kalender(dm,dj);
    kalender.parentNode.replaceChild(neuerKalender, kalender);

}

function KalenderZurueck() {
    if(dm==12) {
        dm=1;
        dj--;
    }else
        dm--;
    var neuerKalender = Kalender(dm,dj);
    kalender.removeChild(HTMLBodyElement);
    
}

        

//Kommentar hinzufügen
function Hinzufuegen () {
      var Typ = document.Formular.Elementtyp.options[document.Formular.Elementtyp.selectedIndex].value;
      var Elementknoten = document.createElement(Typ);
      if (Typ != "hr") {
        var Textknoten = document.createTextNode(document.Formular.Elementinhalt.value);
        Elementknoten.appendChild(Textknoten);
      }
      document.getElementById("User").appendChild(Elementknoten);
    }

