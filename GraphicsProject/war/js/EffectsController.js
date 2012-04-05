function EffectsController()
{
  this.init = function(){
    $("#effects").accordion({
      autoHeight: false,
      navigation: true,
      collapsible: true
    });
    $("effects").click(function(){
      this.removeUiCorners();
    });
    
    this.brightnessContrastInit();
  }
  
  this.brightnessContrastInit = function(){
    $('.brigthnessSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        uniforms.brightness.value = ui.value/100.0;
      }
    });
    $('.contrastSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        uniforms.contrast.value = ui.value/100.0;
      }
    });
    $('.applyBrightnessContrast').button();
    $('.cancelBrightnessContrast').button();
  }
  
  this.init();
}