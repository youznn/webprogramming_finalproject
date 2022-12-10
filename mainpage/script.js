$(document).ready(function(){
  $(document).snowfall({deviceorientation : true, round : true, minSize: 1, maxSize:8,  flakeCount : 250});

  $("#ComposeBtn").click(function(){
    $(".composeWindow").css("display","block");
    $(".inboxWindow").css("display","none");
    $(".outboxWindow").css("display","none");
  })

  $("#InboxBtn").click(function(){
    $(".composeWindow").css("display","none");
    $(".inboxWindow").css("display","block");
    $(".outboxWindow").css("display","none");
  })

  $("#OutboxBtn").click(function(){
    $(".composeWindow").css("display","none");
    $(".inboxWindow").css("display","none");
    $(".outboxWindow").css("display","block");
  })


})
