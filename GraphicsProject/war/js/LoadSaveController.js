function LoadSaveController ()
{
  $('button').button();
  $('button.load').click(function(){
    alert('you clicked the load button');
  });
  $('button.save').click(function(){
    alert('you clicked the save button');
  });
}