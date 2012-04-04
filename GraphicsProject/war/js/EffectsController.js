function EffectsController()
{

  this.removeUiCorners = function(){
//    $("#effects .ui-corner-bottom").removeClass("ui-corner-bottom");
//    $("#effects .ui-corner-top").removeClass("ui-corner-top");
//    $("#effects .ui-corner-all").removeClass("ui-corner-all");
  }
  this.init = function(){
    $("#effects").accordion();
    $("effects").click(function(){
      this.removeUiCorners();
    });
    this.removeUiCorners();
  }
  this.init();
}