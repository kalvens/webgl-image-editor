function WebGL2DTools(panel){
  this.panel = panel;

  this.init = function(){
    this.startColorPicker();
  }

  this.startColorPicker = function(){
    console.debug("here")
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