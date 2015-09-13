////// jquery controls events
$(document).ready(function() {
$(document).on('click','.dicmainmenu .mi',function(){
	var selectedmenuid=$(this).data('id')
	var i_frame=document.getElementById("iframe1")
	switch(parseInt(selectedmenuid)){
	case 1: //// intropage
	i_frame.src="welcome.php";
	activmenu($(this))
	break;
	case 2: /////alphabetes page
	i_frame.src="alphabet.php";
	activmenu($(this))
	break;
	case 3://////words page
	i_frame.src="abcx.php";
	activmenu($(this))
	break;
	case 4: //// subjects page
	i_frame.src="cat.php";
	activmenu($(this))
	break;
	case 5: //// deaf reader page
	i_frame.src="spellit.php";
	activmenu($(this))
	break;
	case 6:///back button
	//// return to apps.php screen
	
	break;		
	}
})///end of menu btns click
	
})///end of doc ready


//// this function is for highlighting the active menu item
function activmenu(element){
		$( "a.mi" ).each(function() {
    $( this ).removeClass('active');
	//alert(this);
  });
 
	$(element).removeClass('active').addClass('active');
}




