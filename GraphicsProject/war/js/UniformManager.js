function UniformManager(){
  var uniforms = {
      uSampler : {type:"t", value:1, texture: null},
      brightness : {type:"f", value: 0.0},
      contrast : {type:"f", value: 1.0},
      hue : {type:"f", value: 0.0},
      saturation : {type:"f", value: 0.0},
      width : {type:"f", value: 1280.0},
      height : {type:"f", value: 800.0},
      denoiseExp : {type:"f", value: 50.0},
      mode : {type:"i", value: 0},
      radiusSwirl : {type:"f", value: 250.0},
      angleSwirl : {type:"f", value: Math.PI},
      inkStrength : {type:"f", value: 0.5},
  };
  
  this.resetUniforms = function(){
    uniforms.brightness.value = 0.0;
    uniforms.contrast.value = 1.0;
    uniforms.hue.value = 0.0;
    uniforms.saturation.value = 0.0;
    uniforms.denoiseExp.value = Math.pow(10,20);
    uniforms.mode.value = 0;
    uniforms.radiusSwirl.value = 250.0;
    uniforms.angleSwirl.value = Math.PI;
    uniforms.inkStrength.value = 0.5;
  }

  this.setTexture = function(texture){
    uniforms.uSampler.texture = texture;
  }
  
  this.changeImageBrightness = function(val){
    uniforms.brightness.value = val;
  }

  this.changeImageContrast = function(val){
    uniforms.contrast.value = val;
  }

  this.changeImageHue = function(val){
    uniforms.hue.value = val;
  }

  this.changeImageSaturation = function(val){
    uniforms.saturation.value = val;
  }
  
  this.changeSize = function(width, height){
    uniforms.width.value = width;
    uniforms.height.value = height;
  }
  
  this.changeDenoiseExp = function(val){
    uniforms.denoiseExp.value = val;
  }
  
  this.changeMode = function(val){
    uniforms.mode.value = val;
  }
  
  this.changeSwirlRadius = function(val){
    uniforms.radiusSwirl.value = val;
  }
  
  this.changeSwirlAngle = function(val){
    uniforms.angleSwirl.value = val;
  }
  
  this.changeInkStrength = function(val){
    uniforms.inkStrength.value = val;
  }
  
  this.getUniforms = function(){
    return uniforms;
  }
}
