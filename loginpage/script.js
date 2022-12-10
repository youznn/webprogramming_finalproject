$(document).ready(function(){

  //Check the inputs are valid.
  let checkEng = /^[A-Z]+[a-z]+$/;
  let checkNum = /^[0-9]+$/;
  let checkEmail = /^[a-z0-9\.\-_]+@([a-z0-9\-]+\.)+[a-z]{2,6}$/;
  let checkpassword =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;

  //0 if each item does not meet the condition, 1 if it does
  let checkall=[0,0,0,0,0,0];

  //store gender value
  let gender;


//navigater - login click -> change border-top color, toggle page
$("#navLogin").click(function(){
  $(this).css({"border-top-color":"#0174DF", "color":"black"});
  $("#navSignUp").css({"border-top-color": "lightgray", "color":"gray"});
  $(".Login").css("display","block");
  $(".Signup").css("display","none");
  $(".ConfirmPage").css("display","none");
});


$("#navSignUp").click(function(){
  $(this).css({"border-top-color":"#0174DF", "color":"black"});
  $("#navLogin").css({"border-top-color": "lightgray", "color":"gray"});
  $(".Login").css("display","none");
  $(".Signup").css("display","block");
  $(".ConfirmPage").css("display","none");
});


//change the border color to red and show/hide the warning/check messages
$("#loginemail").keyup(function(){ //input field
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

$("#firstname").keyup(function(){
  if(!(checkEng.test($(this).val()))){
    $(this).css("border-color","red");
    $("#firstnameCheck").css("opacity","0");
    $("#firstnameWarn").css("opacity","1");
    checkall[0] = 0;
  }
  else{
    $(this).css("border-color","lightgray");
    $("#firstnameCheck").css("opacity","1");
    $("#firstnameWarn").css("opacity","0");
    checkall[0] = 1;
  }
});


$("#email").keyup(function(){
  if(!(checkEmail.test($(this).val()))){
    $(this).css("border-color","red");
    $("#emailCheck").css("opacity","0");
    $("#emailWarn").css("opacity","1");
    checkall[2] = 0;
  }
  else{
    $(this).css("border-color","lightgray");
    $("#emailCheck").css("opacity","1");
    $("#emailWarn").css("opacity","0");
    checkall[2] = 1;
  }
});

$("#password").keyup(function(){
  if(!(checkpassword.test($(this).val()))){
    $(this).css("border-color","red");
    $("#passwordCheck").css("opacity","0");
    $("#passwordWarn").css("opacity","1");
    checkall[3] = 0;
  }
  else{
    $(this).css("border-color","lightgray");
    $("#passwordCheck").css("opacity","1");
    $("#passwordWarn").css("opacity","0");
    checkall[3] = 1;
  }
});

$("#confirmpassword").keyup(function(){
  let mypassword = $("#password").val();
  if(mypassword != $(this).val()){
    $(this).css("border-color","red");
    $("#conpassCheck").css("opacity","0");
    $("#conpasswordWarn").css("opacity","1");
    checkall[4] = 0;
    }
  else{
    $(this).css("border-color","lightgray");
    $("#conpassCheck").css("opacity","1");
    $("#conpasswordWarn").css("opacity","0");
    checkall[4] = 1;
  }
});


//radio button setting
$("#male").click(function(){
  $("#genderCheck").css("opacity","1");
  $("#genderWarn").css("opacity","0");
  checkall[5] = 1;
});

$("#female").click(function(){
  $("#genderCheck").css("opacity","1");
  $("#genderWarn").css("opacity","0");
  checkall[5] = 1;
});


//if the user clicks the sign up button,
$("#subSignUpBtn").click(function(){

  //If there are invalid inputs
  if (checkall[0] == 0){ //first name is invalid
    $("#firstname").css("border-color","red");
    $("#firstnameCheck").css("opacity","0");
    $("#firstnameWarn").css("opacity","1");
  }
  if (checkall[1] == 0){ //last name is invalid
    $("#lastname").css("border-color","red");
    $("#lastnameCheck").css("opacity","0");
    $("#lastnameWarn").css("opacity","1");
  }
  if (checkall[2] == 0){ //email is invalid
    $("#email").css("border-color","red");
    $("#emailCheck").css("opacity","0");
    $("#emailWarn").css("opacity","1");
  }
  if(checkall[3] == 0){ //password is invalid
    $("#password").css("border-color","red");
    $("#passwordCheck").css("opacity","0");
    $("#passwordWarn").css("opacity","1");
  }
  if(checkall[4] == 0){ //confirmpassword is invalid
    $("#confirmpassword").css("border-color","red");
    $("#conpassCheck").css("opacity","0");
    $("#conpasswordWarn").css("opacity","1");
  }
  if(checkall[5] == 0){
    $("#genderWarn").css("opacity","1");
  }

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
