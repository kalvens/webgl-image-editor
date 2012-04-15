function EffectsController()
{
  var instance = this;
  this.init = function(){
    $("#effects").accordion({
      autoHeight: false,
      navigation: true,
      collapsible: true,
      active: false,
    });
    $('#effects').click(function(){
      var mode = $("#effects").accordion( "option", "active" );
      console.debug(mode);
      appController.um.changeMode(mode);
    });
    this.closeAllAccordions();
    this.commonButtonInit();
    this.brightnessContrastInit();
    this.hueSaturationInit();
    this.denoiseInit();
    this.abstractInit();
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
      appController.webGL2D.caputureCurrentPic();
      appController.um.resetUniforms();
      instance.closeAllAccordions();
      instance.restoreDefaultSlider();
    });
    $('.effectsCancelButton').click(function(){
      appController.um.resetUniforms();
      instance.closeAllAccordions();
      instance.restoreDefaultSlider();
    });
  }

  this.brightnessContrastInit = function(){
    $('.brigthnessSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        appController.um.changeImageBrightness(ui.value/100.0);
      }
    });
    $('.contrastSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        if(ui.value < 0)
          appController.um.changeImageContrast((ui.value + 100)/100.0);
        else
          appController.um.changeImageContrast(ui.value*0.1+1.0)
      }
    });
  }

  this.hueSaturationInit = function(){
    $('.hueSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        appController.um.changeImageHue(ui.value/100.0);
      }
    });
    $('.saturationSlider').slider({
      value:0,
      min:-100,
      max:100,
      slide: function( event, ui ) {
        if(ui.value > 0)
          appController.um.changeImageSaturation(1.0-1.0/(1.01-ui.value/100.0))
        else
          appController.um.changeImageSaturation(-1*ui.value/100.0);
      }
    });
  }
  
  this.denoiseInit = function(){
    $('.denoiseSlider').slider({
      value:0,
      min:0,
      max:500,
      slide: function( event, ui ) {
        appController.um.changeDenoiseExp((500-ui.value)/10.0);
      }
    });
  }
  
  this.abstractInit = function(){
    $('.abstractPixilateSlider').slider({
      value:0,
      min:0,
      max:500,
      slide: function( event, ui ) {
        appController.um.changeAbstractSize((500-ui.value)/10.0);
      }
    });
  }

  this.init();
}