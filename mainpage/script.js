$(document).ready(function(){
  
  var sender = (localStorage.getItem("current")) ? localStorage.getItem("current") : "login/signup plz!";

  var len_totalmessage = localStorage.getItem("to"+sender) ? JSON.parse(localStorage.getItem("to"+sender)).length : 0;
  var inboxmessages = localStorage.getItem("to"+sender) ? JSON.parse(localStorage.getItem("to"+sender)) : [];
  var outboxmessages = localStorage.getItem("from"+sender) ? JSON.parse(localStorage.getItem("from"+sender)) : [];
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
  })


  $("#info_name").text(sender); //info_name setting
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

  $("#info_name").on("propertychange change keyup paste input", function (){
    if ($(this).val() === "login/signup plz!") //this means Logout.
      $("#sendBtn").attr('disabled', true);
    else {
      $("#sendBtn").attr('disabled', false);
    }
  })


  $("#sendBtn").click(function(){
    
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

    $(".composeWindow").css("display", "none");
    $(".inbox_complete").css("display", "block");

    setTimeout(function() {
      $(".inbox_complete").css("display", "none");
      $(".composeWindow").css("display", "block");


    }, 5000)

  })

})
