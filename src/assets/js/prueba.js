function prueba(){
    var current = 1,current_step,next_step,steps;
    steps = $(".formularioACN").length;
    $(".siguiente").click(function(){
      current_step = $(this).parent();
      next_step = $(this).parent().next();
      next_step.show();
      current_step.hide();
      setProgressBar(++current);
    });
    $(".anterior").click(function(){
      current_step = $(this).parent();
      next_step = $(this).parent().prev();
      next_step.show();
      current_step.hide();
      setProgressBar(--current);
    });
    setProgressBar(current);
    // Change progress bar action
    function setProgressBar(curStep){
      var percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".barra-progreso")
        .css("width",percent+"%")
        .html(percent+"%");   
    }
}
