function LoadSaveController ()
{
  var lsc = this;
  this.loadImageDialog = function()
  {
    var dialog = $('.selectImageDialog').dialog({
      autoOpen: true,
      height: 450,
      width: 750,
      modal: true,
      title: "Load Image"
    });
    
  }
  this.init = function(){
    $('button').button();
    $('button.load').click(function(){
      lsc.loadImageDialog();
    });
    $('button.save').click(function(){
      alert('you clicked the save button');
    });
  }
  this.init();
}