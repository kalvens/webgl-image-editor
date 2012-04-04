function LoadSaveController ()
{
  var lsc = this;

  function dragEnter(evt)
  {
    //alert("drag enter");
  }
  function dragDrop(evt)
  {
    //alert("drag drop");
  }
  function dragExit(evt)
  {
    //alert("drag exit");
  }
  function dragOver(evt)
  {
    //alert("drag over");
  }

  this.dragAndDrop = function()
  {
    var container = $('.dndZone')[0];
    var body = $('body')[0];
    body.addEventListener("dragenter",dragEnter, false);
    container.addEventListener("dragexit",dragExit, false);
    container.addEventListener("dragover",dragOver, false);
    container.addEventListener("drop",dragDrop, false);
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
    });
    $('.selectImageDialog img').click(function(){
      var img = $(this).attr('src');
      appController.newImg(img);
      console.debug(img);
      $('.selectImageDialog').dialog("close")
    });
  }
  this.init();
}