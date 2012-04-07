function LoadSaveController ()
{
  var lsc = this;

  function dragEnter(evt)
  {
    $(".dndZone").addClass("dragEvent");
    console.debug("drag enter");  
  }
  function dragDrop(evt)
  {
    
    appController.newImg(evt.srcElement);
  }
  function dragExit(evt)
  {
    $(".dndZone").removeClass("dragEvent");
    console.debug("drag exit");
    //alert("drag exit");
  }
  function dragOver(evt)
  {
    //alert("drag over");
  }

  this.dragAndDrop = function()
  {
    var cell = $('.cell')[0];
    var html = $('html')[0];
    cell.addEventListener("dragenter",dragEnter, false);
    cell.addEventListener("dragleave",dragExit, false);
    cell.addEventListener("dragover",dragOver, false);
    cell.addEventListener("ondrop",dragDrop, false);
  }

  this.loadImageDialog = function()
  { 
    $('.selectImageDialog').dialog({
      autoOpen: true,
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
      caputureCurrentPic();
    });
    $('.selectImageDialog img').click(function(){
      var img = $(this).attr('src');
      appController.newImg(img);
      console.debug(img);
      $('.selectImageDialog').dialog("close")
    });
    this.dragAndDrop();
  }
  this.init();
}