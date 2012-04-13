function EffectsController()
{
  this.ec = this;
  this.init = function(){
    $("#effects").accordion({
      autoHeight: false,
      navigation: true,
      collapsible: true
    });
    this.closeAllAccordions();
    this.commonButtonInit();
    this.brightnessContrastInit();
    this.hueSaturationInit();
  }

  this.closeAllAccordions = function(){
    $('#effects').accordion("activate", false);
  }

  this.restoreDefaultSlider = function(){
    $('.slider').slider({
      value: 0,
    });
  }

  this.commonButtonInit = function(){
    $('.effectsApplyButton').button();
    $('.effectsCancelButton').button();
    $('.effectsApplyButton').click(function(){
      caputureCurrentPic();
      returnUniformsToDefault();
      ec.closeAllAccordions();
      ec.restoreDefaultSlider();
    });
    $('.effectsCancelButton').click(function(){
      returnUniformsToDefault();
      ec.closeAllAccordions();
      ec.restoreDefaultSlider();
    });
  }

  this.brightnessContrastInit = function(){
    $('.brigthnessSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        changeImageBrightness(ui.value/100.0);
      }
    });
    $('.contrastSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        if(ui.value < 0)
          changeImageContrast((ui.value + 100)/100.0);
        else
          changeImageContrast(ui.value*0.1+1.0)
      }
    });
  }

  this.hueSaturationInit = function(){
    $('.hueSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        changeImageHue(ui.value/100.0);
      }
    });
    $('.saturationSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        if(ui.value > 0)
          changeImageSaturation(1.0-1.0/(1.01-ui.value/100.0))
        else
          changeImageSaturation(-1*ui.value/100.0);
      }
    });
  }

  this.init();
}