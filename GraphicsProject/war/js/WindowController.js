function WindowController(callback)
{
  var wc = this;
  this.callback = callback;
  this.resizeSections = function(){
    var top_h = $('.top_bar').height();
    var window_h = $(window).height();
    var window_w = $(window).width();
    //Set the height of the sidebar and main view
    $('.side_bar').height(window_h-top_h);
    $('.main_view').height(window_h-top_h);
    $('.side_bar').width('300px');
    $('.main_view').width(window_w-300);
    callback();
  }
  
  $(window).resize(function(){
    wc.resizeSections();
  });
  
  this.resizeSections();
  
}