$(document).ready(function(){
  
  var sender = (localStorage.getItem("current"));
  var len_totalmessage = 5;
  var inboxmessages = ["안녕지수야처음봣을때부터널좋아했어","안녕지수야메리크리스마스","웹프실종강하고싶어요"];
  var outboxmessages = ["언닝 안녕 나 지수얌", "헐 우리 곧 종강이넹", "언니 메리크리스마스!", "타메르 교수님 최고최고"];
  $("#info_name").text(sender);
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


  $("#info_name").text(localStorage.getItem("current")); //info_name setting
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
    if(!localStorage.getItem($("#recipient").val())){
      $("#check_nick").css("display","block");
    }
    else{
      $("#check_nick").text("Valid Nickname.");
      $("#check_nick").css({"display":"block", "color":"green"});
    }
  })


  $("#sendBtn").click(function(){
    
    //localStorage.setItem(sender+"->"+$("#recipient").val(), $(".messagearea").val());

    //Sender sent message to recipient at least once.
    if (localStorage.getItem(sender+"->"+$("#recipient").val())) {
      var messageArr = JSON.parse(localStorage.getItem(sender+"->"+$("#recipient").val()));
      messageArr.push($(".messagearea").val());
      localStorage.setItem(sender+"->"+$("#recipient").val(), JSON.stringify(messageArr));
    } else { //sending message first time.
      alert(2);
      var Arr = [$(".messagearea").val()];
      localStorage.setItem(sender+"->"+$("#recipient").val(), JSON.stringify(Arr));
    }

  })

})
