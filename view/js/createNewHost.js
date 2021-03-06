var counter = 1;
var limit = 50; //

/** event handler for submitting host  **/
$( "#hostInput" ).submit(function(e){
    e.preventDefault();
    var token = null;
    var cookie = document.cookie.split(';');

    //checking if there is token in cookie
if(cookie!= undefined){
    for (var i = 0;i<cookie.length; i++) {
        var name = cookie[i].split('=')[0].replace(' ' ,'');
        if (name == "token"){
            token = cookie[i].split('=')[1];

        }
    }
}
    console.log("data" + token);

    //if no token redirect to login page
    if(token == null){
        alert("User not login! Redirecting...");
        window.location.href = "/login.html";
    }


    //handle data and post to host
    var items = [];
    var prices= [];
    var hours = [];

    for(var i = 0; i < counter ; i++){
        items[i] = $( "#itemName" + (i + 1) ).val();
        prices[i] = $( "#price" + (i + 1) ).val();
    }
    for(var i = 0; i < 7 ; i++){
        hours[i] = $( "#hr" + i ).val();
    }

    console.log(hours);
    console.log($( "#contact" ).val());


    $.post( "/host/add",
        {

            "name" : $( "#name" ).val(),
            "contact": $( "#contact" ).val(),
            "description":$( "#description" ).val(),
            "token": token,
            "items" : JSON.stringify(items),
            "prices" : JSON.stringify(prices),
            "hours" : JSON.stringify(hours),
        }
        )
        .done(function(data) {
            console.log(data);
            if(data.success === undefined){
                window.location.href = data;
            }
            else{
                alert("Please login!");
                //window.location.href = "/login.html";
            }
            return;
        }).error();

})

/** adding and removing input fields  **/
function addInput(divName){
    if (counter == limit)  {
        alert("You have reached the limit of adding " + counter + " inputs");
    }
    else {
        var newdiv = document.createElement('div');
        newdiv.innerHTML = "<div class='row'><div class='col-md-1'>Item " + (counter + 1) + "</div>"
            + "<div class='col-md-4'><input type='text' class='form-control' id='itemName"+(counter + 1)+"' required></div>"
            +" <div class='col-md-2'><input type='text' class='form-control' id='price"+(counter + 1)+"'  step='any' required></div></div></div>" ;
        document.getElementById(divName).appendChild(newdiv);
        counter++;
    }
}
function removeInput(divName){
    if(counter > 1){
        var itemsList = document.getElementById(divName);
        itemsList.removeChild(itemsList.lastChild);
        counter--;
    }
}
