function WebGL2DTools(panel){
  this.panel = panel;
  this.current_tool;
  
  this.init = function(){
    this.startColorPicker();
    this.setupToolButtons()
  }
  
  this.setupToolButtons = function(){
    $('.toolButton').click(function(){
      $('.toolButton').removeClass('tool-selected');
      $(this).addClass('tool-selected');
      $('canvas').addClass('cursor_crosshair');
    });
  }

  this.startColorPicker = function(){
    $('#colorSelector').ColorPicker({
      color: '#0000ff',
      onShow: function (colpkr) {
        $(colpkr).fadeIn(500);
        return false;
      },

      onHide: function (colpkr) {
        $(colpkr).fadeOut(500);
        return false;
      },

      onChange: function (hsb, hex, rgb) {
        $('#colorSelector div').css('backgroundColor', '#' + hex);
      }

    })
  }

  this.init()
}