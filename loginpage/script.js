$(document).ready(function(){

  $(document).snowfall({deviceorientation : true, round : true, minSize: 1, maxSize:8,  flakeCount : 250});


  //Check the inputs are valid.
  let checkEng = /^[a-zA-z0-9]{1,10}$/;
  let checkNum = /^[0-9]+$/;
  let checkEmail = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
  let checkpassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}$/;
  //0 if each item does not meet the condition, 1 if it does
  let checkall=[0,0,0];

  //store gender value


//navigater - login click -> change border-top color, toggle page
$("#navLogin").click(function(){
  $(this).css({"color":"white", "background-color": "#163B33"});
  $("#navSignUp").css({"color":"gray", "background-color":"#030807"});
  $(".Login").fadeIn();
  $(".Signup").css("display","none");
  $(".ConfirmPage").css("display","none");
  $("#nickname").val('');
  $("#nick_warn").css("color","white");
  $("#nick_warn").text("It must not exceed 10 characters.");
  $("#password").val('');
  $("#pw_warn").css("color","white");
  $("#pw_warn").text("passwords should be at least 6 characters long with English case and special characters.");
  $("#confirmpassword").val('');
  $("#cpw_warn").css("color","white");
  $("#cpw_warn").text("Repeat your password.");
});

$("#navSignUp").css("background-color","#030807")
$("#navSignUp").click(function(){
  $(this).css({"color":"white", "background-color": "#163B33"});
  $("#navLogin").css({"color":"gray" , "background-color":"#030807"});
  $(".Login").css("display","none");
  $(".Signup").fadeIn();
  $(".ConfirmPage").css("display","none");
  $("#loginpassword").val('');

  $("#loginnickname").val('');
  $("#logintext").text("Enter user nickname and Password");
  $("#logintext").css("color","white");

});


//change the border color to red and show/hide the warning/check messages
$("#loginID").keyup(function(){ //input field
  if(!(checkId.test($(this).val()))){
    $(this).css("background-color","#F8E0E0");
    $("#logId_warn").css({"display": "block"});
  }
  else{
    $(this).css("background-color","white");
    $("#logId_warn").css({"display": "none"});
  }
});

//Logic as above
$("#loginpassword").keyup(function(){
  if(($(this).val() == "")){
    $(this).css("background-color","#F8E0E0");
    $("#logPw_warn").css({"display": "block"});
  }
  else{
      $("#logPw_warn").css({"display": "none"});
  }
});

$("#nickname").on("propertychange change keyup paste input", function (){


  if (!$(this).val()) { //nickname field is empty
    $(this).css("background-color","white");
    $("#nick_warn").css("color","white");
    $("#nick_warn").text("It must not exceed 10 characters.");
    checkall[0] = 0;
  }

  else if(!(checkEng.test($(this).val()))){ //nickname is not invalid
    $(this).css("background-color","#F8E0E0");
    $("#nick_warn").css("color","red");
    $("#nick_warn").text("It must not exceed 10 characters.");
    checkall[0] = 0;
  }

  else if (localStorage.getItem($(this).val())) { //nickname is already in localStorage. nickname has to be unique.
    $(this).css("background-color","#F8E0E0");
    $("#nick_warn").css("color","red");
    $("#nick_warn").text("This nickname is not available.");
    checkall[0] = 0;
  }
  else{ //valid nickname
    $(this).css("background-color","white");
    $("#nick_warn").css("color","white");
    $("#nick_warn").text("Available nickname!");

    checkall[0] = 1; //nickname setting is complete.
  }
});


$("#password").on("propertychange change keyup paste input", function (){
  if (!$(this).val()) { //password field is empty.
    $(this).css("background-color","white");
    $("#pw_warn").css("color","white");
    $("#pw_warn").text("Passwords should be at least 6 characters long with English case and special characters.")
  }
  else if(!(checkpassword.test($(this).val()))){ //invalid password.
    $(this).css("background-color","#F8E0E0");
    $("#pw_warn").css("color","red");
    $("#pw_warn").text("Passwords should be at least 6 characters long with English case and special characters.")

    checkall[1] = 0;
  }
  else{ //valid password.
    $(this).css("background-color","white");
    $("#pw_warn").css("color","white");
    $("#pw_warn").text("Available password!")

    checkall[1] = 1; //password setting is complete.
  }
});

$("#confirmpassword").on("propertychange change keyup paste input", function (){
  let mypassword = $("#password").val();
  if (!$(this).val()) { //confirm password field is empty.
    $(this).css("background-color","white");
    $("#cpw_warn").css("color","white");
    $("#cpw_warn").text("Repeat your password.");
    checkall[2] = 0;
  }
  else if(mypassword != $(this).val()){ //do not match with password
    $(this).css("background-color","#F8E0E0");
    $("#cpw_warn").text("Password does not match!");
    $("#cpw_warn").css("color","red");
    checkall[2] = 0;
    }

  else{ 
    $(this).css("background-color","white");
    $("#cpw_warn").css("color","white");
    $("#cpw_warn").text("Correct password!");
    checkall[2] = 1;
  }
});




//if the user clicks the sign up button,
$("#subSignUpBtn").click(function(){

  //If there are invalid inputs
  if (checkall[0] == 0){ //first name is invalid
    $("#nickname").css("background-color","#F8E0E0");
    $("#nick_warn").css("color","red");
  }

  if (checkall[1] == 0){ //email is invalid
    $("#password").css("background-color","#F8E0E0");
    $("#pw_warn").css("color","red");
  }
  if(checkall[2] == 0){ //password is invalid
    $("#confirmpassword").css("background-color","#F8E0E0");
    $("#cpw_warn").css("color","red");
  }



  //If all the conditions are met
  else{
    //store the values at localstorage
    localStorage.setItem($("#nickname").val(), $("#password").val());
    $(".Signup").css("display","none");
    $(".ConfirmPage").css("display","block");
    $("#confirmMessage").text("You are Signed Up");
  }
});

//If the user clicks the login button
$("#subLoginBtn").click(function(){


  if (!$("#loginnickname").val() || !($("#loginpassword").val())) {
    $("#logintext").css("color","red");
    $("#logintext").text("Enter user nickname and password");
  }

  else if (!localStorage.getItem($("#loginnickname").val())){ //nickname is not in local storage
    $("#logintext").css("color","red");
    $("#logintext").text("You have to sign up.");
  }

  //credential do not match.
  else if (localStorage.getItem($("#loginnickname").val()) !== $("#loginpassword").val()) {
    $("#logintext").css("color","red");
    $("#logintext").text("Credential do not match!");
  }

  else{ //login success.
    //$(".Login").css("display","none");
    //$(".ConfirmPage").css("display","block");
    //$("#confirmMessage").text("You are Logged in");
    localStorage.setItem("current", $("#loginnickname").val());
    location.href = "../mainpage/index.html";
  }
});

});
