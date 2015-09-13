////// jquery controls events
$(document).ready(function() {
$(".introcontainer .introdiv").hide()
$(".intro1").fadeIn("slow")
$(".rightarrow").hide()
$(".leftarrow").show()
$(document).on('click','.introcontainer .navarrow ',function(){
	var leftright=$(this).data('nexprev')
	switch(leftright){
	case "next":
	$(".introcontainer .intro1").hide()
	$(".introcontainer .intro2").fadeIn("slow")
	$(".rightarrow").show()
	$(".leftarrow").hide()
	break;
	case "prev":
	$(".introcontainer .intro2").hide()
	$(".introcontainer .intro1").fadeIn("slow")
	
	$(".rightarrow").hide()
	$(".leftarrow").show()
	break;	
	}
})

	
})///end of doc ready







