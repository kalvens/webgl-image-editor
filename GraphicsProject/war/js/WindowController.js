function WindowController(callback)
{
  var wc = this;
  this.callback = callback;
  this.resizeSections = function(){
    var top_h = $('.top_bar').height();
    var window_h = $(window).height();
    var window_w = $(window).width();
    //Set the height of the sidebar and main view
    
    var main_view_h = window_h - top_h;
    var main_view_w = window_w - 300;
    
    if(main_view_h < 800 || main_view_w < 1280)
    {
    	$('.main_view').addClass("overflowScroll");
    }
    else
    {
    	$('.main_view').removeClass("overflowScroll");
    }
    $('.side_bar').height(window_h-top_h);
    $('.main_view').height(window_h-top_h);
    $('.side_bar').width('300px');
    $('.main_view').width(window_w-300);
  }
  
  $(window).resize(function(){
    wc.resizeSections();
  });
  
  this.resizeSections();
  
}