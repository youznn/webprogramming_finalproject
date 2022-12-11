$(document).ready(function(){
  var valid_names = ["jisukim","yoojinlee","ggomi","choco"];
  var usernickname = "testName";
  var len_totalmessage = 5;
  var inboxmessages = ["안녕지수야처음봣을때부터널좋아했어","안녕지수야메리크리스마스","웹프실종강하고싶어요"];
  var outboxmessages = ["언닝 안녕 나 지수얌", "헐 우리 곧 종강이넹", "언니 메리크리스마스!", "타메르 교수님 최고최고"];
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


  $("#info_name").text(usernickname); //info_name setting
  $("#info_message").text("Total messages: " + len_totalmessage); //info_message setting

  //inbox messages setting
  for(var i=1; i<(inboxmessages.length + 1); i++){
    $(".inbox_src:nth-child("+i+")").text(inboxmessages[i-1]);
  }

  //outbox messages setting
  for(var i=1; i<(outboxmessages.length + 1); i++){
    $(".outbox_src:nth-child("+i+")").text(outboxmessages[i-1]);
  }

  //nickname search
  $("#searchBtn").click(function(){
    if(!valid_names.includes($("#recipient").val())){
      $("#check_nick").css("display","block");
    }
    else{
      $("#check_nick").text("Valid Nickname.");
      $("#check_nick").css({"display":"block", "color":"green"});
    }
  })

})
