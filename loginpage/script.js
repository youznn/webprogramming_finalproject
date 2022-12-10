$(document).ready(function(){

  $(document).snowfall({deviceorientation : true, round : true, minSize: 1, maxSize:8,  flakeCount : 250});


  //Check the inputs are valid.
  let checkEng = /^[A-Z]+[a-z]+$/;
  let checkNum = /^[0-9]+$/;
  let checkEmail = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
  let checkpassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;
  let checkId = /^[a-zA-z0-9]{4,10}$/
  //0 if each item does not meet the condition, 1 if it does
  let checkall=[0,0,0];

  //store gender value


//navigater - login click -> change border-top color, toggle page
$("#navLogin").click(function(){
  $(this).css({"color":"white", "background-color": "#163B33"});
  $("#navSignUp").css({"color":"gray", "background-color":"#030807"});
  $(".Login").css("display","block");
  $(".Signup").css("display","none");
  $(".ConfirmPage").css("display","none");
});

$("#navSignUp").css("background-color","#030807")
$("#navSignUp").click(function(){
  $(this).css({"color":"white", "background-color": "#163B33"});
  $("#navLogin").css({"color":"gray" , "background-color":"#030807"});
  $(".Login").css("display","none");
  $(".Signup").css("display","block");
  $(".ConfirmPage").css("display","none");
});


//change the border color to red and show/hide the warning/check messages
$("#loginID").keyup(function(){ //input field
  if(!(checkEmail.test($(this).val()))){
    $(this).css("border-color","red");
    $("#loginEmailCheck").css("opacity","0");
    $("#loginEmailWarn").css("opacity","1");
  }
  else{
    $(this).css("border-color","lightgray");
    $("#loginEmailCheck").css("opacity","1");
    $("#loginEmailWarn").css("opacity","0");
  }
});

//Logic as above
$("#loginpassword").keyup(function(){
  if(($(this).val() == "")){
    $(this).css("border-color","red");
    $("#loginPasswordCheck").css("opacity","0");
    $("#loginPassWarn").css("opacity","1");
  }
  else{
    $(this).css("border-color","lightgray");
    $("#loginPasswordCheck").css("opacity","1");
    $("#loginPassWarn").css("opacity","0");
  }
});

$("#nickname").keyup(function(){
  if($("#nickname").val().length > 10){
    $(this).css("background-color","#F8E0E0");
    $("#nick_warn").css("color","red");
    checkall[0] = 0;
  }
  else{
    $(this).css("background-color","white");
    $("#nick_warn").css("color","white");
    checkall[0] = 1;
  }
});

$("#ID").keyup(function(){
  if(!(checkId.test($(this).val()))){
    $(this).css("background-color","#F8E0E0");
    $("#id_warn").css("color","red");
    checkall[1] = 0;
  }
  else{
    $(this).css("background-color","white");
    $("#id_warn").css("color","white");
    checkall[1] = 1;
  }
});



$("#password").keyup(function(){
  if(!(checkpassword.test($(this).val()))){
    $(this).css("background-color","#F8E0E0");
    $("#pw_warn").css("color","red");
    checkall[2] = 0;
  }
  else{
    $(this).css("background-color","white");
    $("#pw_warn").css("color","white");
    checkall[2] = 1;
  }
});

$("#confirmpassword").keyup(function(){
  let mypassword = $("#password").val();
  if(mypassword != $(this).val()){
    $(this).css("background-color","#F8E0E0");
    $("#cpw_warn").css("color","red");
    checkall[3] = 0;
    }
  else{
    $(this).css("background-color","white");
    $("#cpw_warn").css("color","white");
    checkall[3] = 1;
  }
});




//if the user clicks the sign up button,
$("#subSignUpBtn").click(function(){

  //If there are invalid inputs
  if (checkall[0] == 0){ //first name is invalid
    $("#nickname").css("background-color","#F8E0E0");
    $("#nick_warn").css("color","red");
  }
  if (checkall[1] == 0){ //last name is invalid
    $("#ID").css("background-color","#F8E0E0");
    $("#id_warn").css("color","red");
  }
  if (checkall[2] == 0){ //email is invalid
    $("#password").css("background-color","#F8E0E0");
    $("#pw_warn").css("color","red");
  }
  if(checkall[3] == 0){ //password is invalid
    $("#confirmpassword").css("background-color","#F8E0E0");
    $("#cpw_warn").css("color","red");
  }




//여기서부터는 지난 과제에 쓰인거,,

  //If all the conditions are met
  else{
    //store the values at localstorage
    localStorage.setItem("first",$("#firstname").val());
    localStorage.setItem("last",$("#lastname").val());
    localStorage.setItem("email",$("#email").val());
    localStorage.setItem("password",$("#password").val());
    localStorage.setItem("gender",gender);
    $(".Signup").css("display","none");
    $(".ConfirmPage").css("display","block");
    $("#confirmMessage").text("You are Signed Up");
  }
});

//If the user clicks the login button
$("#subLoginBtn").click(function(){

  //Get values from local storage
  var emailval = localStorage.getItem("email");
  var passwordval = localStorage.getItem("password");

  if($("#loginemail").val()!== emailval || $("#loginpassword").val()!== passwordval){
    $("#logintext").css("color","red");
    $("#logintext").text("Credential do not match!");
  }

  else{
    $(".Login").css("display","none");
    $(".ConfirmPage").css("display","block");
    $("#confirmMessage").text("You are Logged in");
  }
});

});
