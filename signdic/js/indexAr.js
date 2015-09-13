///// load  Arabic words in iframe
function loadabc()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="abcx.html";

}
function loadabcg()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="abcxg.html";

}

function loadabce()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="abce.html";

}

function loadcat()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="cat.html";

}
function loadcatg()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="catg.html";

}
///// load words categories in iframe
function loadcate()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="cate.html";

}
///// load arabic alphabets in iframe
function loadLearn()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="arabicfordeaf-1.html";

}
function loadalpabetg()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="alphabetg.html";

}

//// load english alphabets
function loadalpabete()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="alphabete.html";

}

function loadaddword()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="spellit.html";

}
function loadaddwordg()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="spellitg.html";

}

/// loading deaf reader in iframe
function loadaddworde()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="spellite.html";

}
// loading the welcome for Arabic for deaf screen in iframe
function loadwelcomeAr()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="welcomeAr.html";

}
/// loading sign language song html in the iframe
function loadsong()
{
var ifrm=document.getElementById("iframe1");
ifrm.src="song1.html";

}
//// this function is for highlighting the active menu item
function activmenu(element){
		$( "a.mi" ).each(function() {
    $( this ).removeClass('active');
	//alert(this);
  });
 
	$(element).removeClass('active').addClass('active');
}




