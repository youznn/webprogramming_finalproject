$(document).ready(function(){
  
  var sender = (localStorage.getItem("current"));
  alert(sender);
  var len_totalmessage = JSON.parse(localStorage.getItem("to"+sender)).length;
  var inboxmessages = JSON.parse(localStorage.getItem("to"+sender));
  var outboxmessages = JSON.parse(localStorage.getItem("from"+sender));
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
    if (localStorage.getItem("to"+$("#recipient").val())) {
      var messageArr = JSON.parse(localStorage.getItem("to"+$("#recipient").val()));
      messageArr.push($(".messagearea").val());
      localStorage.setItem("to"+$("#recipient").val(), JSON.stringify(messageArr));
    }

    else {
      var Arr = [$(".messagearea").val()];
      localStorage.setItem("to"+$("#recipient").val(), JSON.stringify(Arr));
    }
    
    if (localStorage.getItem("from"+sender)) {
      var messageArr = JSON.parse(localStorage.getItem("from"+sender));
      messageArr.push($(".messagearea").val());
      localStorage.setItem("from"+sender, JSON.stringify(messageArr));
    }
    
    else { //sending message first time.
      var Arr = [$(".messagearea").val()];
      localStorage.setItem("from"+sender, JSON.stringify(Arr));
    }

  })

})
