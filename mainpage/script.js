
$(document).ready(function(){
  
  
  var sender = (localStorage.getItem("current")) ? localStorage.getItem("current") : "login/signup plz!";

  var len_totalmessage = localStorage.getItem("->"+sender) ? JSON.parse(localStorage.getItem("->"+sender)).length : 0;
  var inboxmessages = localStorage.getItem("->"+sender) ? JSON.parse(localStorage.getItem("->"+sender)) : [];
  var outboxmessages = localStorage.getItem(sender+"->") ? JSON.parse(localStorage.getItem(sender+"->")) : [];
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

  $("#logoutbtn").click(function() {
    localStorage.removeItem("current");
    $("#info_name").text("login/signup plz!");
    $("#info_message").text("Total messages: " + 0);
    
    for(var i=1; i<(inboxmessages.length + 1); i++){
      $(".inbox_src:nth-child("+i+")").text("");
      $(".inbox_src:nth-child("+i+")").css("opacity", "0.1");
  
    }
  
    for(var i=1; i<(outboxmessages.length + 1); i++){
      $(".outbox_src:nth-child("+i+")").text("");
      $(".outbox_src:nth-child("+i+")").css("opacity", "0.1");
    }
  })


  $("#info_name").text(sender); //info_name setting
  $("#info_message").text("Total messages: " + len_totalmessage); //info_message setting

  //inbox messages setting
  for(var i=1; i<(inboxmessages.length + 1); i++){
    $(".inbox_src:nth-child("+i+")").text(inboxmessages[i-1]);
    $(".inbox_src:nth-child("+i+")").css("opacity", "1");

  }

  //outbox messages setting
  for(var i=1; i<(outboxmessages.length + 1); i++){
    $(".outbox_src:nth-child("+i+")").text(outboxmessages[i-1]);
    $(".outbox_src:nth-child("+i+")").css("opacity", "1");
  }

  //nickname search
  $("#searchBtn").click(function(){
    if(!localStorage.getItem($("#recipient").val())){
      $("#check_nick").text("Invalid Nickname.");
      $("#check_nick").css({"display":"block", "color":"red"});
    }
    else{
      $("#check_nick").text("Valid Nickname.");
      $("#check_nick").css({"display":"block", "color":"green"});
    }
  })

  $("#info_name").on("propertychange change keyup paste input", function (){
    if ($(this).val() === "login/signup plz!") //this means Logout.
      $("#sendBtn").attr('disabled', true);
    else {
      $("#sendBtn").attr('disabled', false);
    }
  })


  $("#sendBtn").click(function(){
    
    //로그인 안 한 경우 
    if (!(localStorage.getItem("current"))) {
      alert("Login before Sending Messages!");
    }

    else if (!localStorage.getItem($("#recipient").val())) {
      alert("Select a valid recipient!");
    }

    else {
      //Sender sent message to recipient at least once.
      if (localStorage.getItem("->"+$("#recipient").val())) {
        var messageArr = JSON.parse(localStorage.getItem("->"+$("#recipient").val()));
        messageArr.push($(".messagearea").val());
        localStorage.setItem("->"+$("#recipient").val(), JSON.stringify(messageArr));
      }

      else {
        var Arr = [$(".messagearea").val()];
        localStorage.setItem("->"+$("#recipient").val(), JSON.stringify(Arr));
      }
    
      if (localStorage.getItem(sender+"->")) {
        var messageArr = JSON.parse(localStorage.getItem(sender+"->"));
        messageArr.push($(".messagearea").val());
        localStorage.setItem(sender+"->", JSON.stringify(messageArr));
      }
    
      else { //sending message first time.
        var Arr = [$(".messagearea").val()];
        localStorage.setItem(sender+"->", JSON.stringify(Arr));
      }

    
      $(".composeWindow").css("display", "none");
      $(".inbox_complete").css("display", "block");

      setTimeout(function() {
        $(".inbox_complete").css("display", "none");
        $(".composeWindow").css("display", "block");
      }, 3000)

      var outboxmessages = localStorage.getItem(sender+"->") ? JSON.parse(localStorage.getItem(sender+"->")) : [];
      for(var i=1; i<(outboxmessages.length + 1); i++){
        $(".outbox_src:nth-child("+i+")").text(outboxmessages[i-1]);
        $(".outbox_src:nth-child("+i+")").css("opacity", "1");
      }
    }

    $("#recipient").val("");
    $(".messagearea").val("");
    $("#check_nick").css({"display":"none"});
  })  

})
