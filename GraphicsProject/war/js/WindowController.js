function WindowController(callback)
{
	var wc = this;
	this.callback = callback;
	this.checkCanvasSize = function(){
		var top_h = $('.top_bar').height();
		var window_h = $(window).height();
		var window_w = $(window).width();
		//Set the height of the sidebar and main view

		var main_view_h = window_h - top_h;
		var main_view_w = window_w - 260;

		if(main_view_h < $('canvas').height() || main_view_w < $('canvas').width())
		{
			$('.main_view').addClass("overflowScroll");
		}
		else
		{
			$('.main_view').removeClass("overflowScroll");
		}
		$('.side_bar').height(window_h-top_h);
		$('.main_view').height(window_h-top_h);
		$('.side_bar').width('260px');
		$('.main_view').width(window_w-260);
	}

	this.resizeSections = function(){
		this.checkCanvasSize();
		appController.resizeCanvas();
	}

	$(window).resize(function(){
		wc.resizeSections();
	});

	this.resizeSections();

}