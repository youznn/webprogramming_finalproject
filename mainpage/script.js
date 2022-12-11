$(document).ready(function(){

  var usernickname = "testName";
  var len_totalmessage = 5;
  var inboxmessages = ["안녕지수야처음봣을때부터널좋아했어","안녕지수야메리크리스마스","웹프실종강하고싶어요"];

  $(document).snowfall({deviceorientation : true, round : true, minSize: 1, maxSize:8,  flakeCount : 250});

  $("#ComposeBtn").click(function(){
    $(".composeWindow").fadeIn();
    $(".inboxWindow").css("display","none");
    $(".outboxWindow").css("display","none");
  })

  $("#InboxBtn").click(function(){
    $(".composeWindow").css("display","none");
    $(".inboxWindow").fadeIn();
    $(".outboxWindow").css("display","none");
  })

  $("#OutboxBtn").click(function(){
    $(".composeWindow").css("display","none");
    $(".inboxWindow").css("display","none");
    $(".outboxWindow").fadeIn();
  })

  $("#info_name").text(usernickname);
  $("#info_message").text("Total messages: " + len_totalmessage);
  $.each(inboxmessages, function(idx, item){
    $("#inbox_wrap:eq("+ i + ")").text(inboxmessages[idx]);
  })
})
