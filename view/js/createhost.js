var counter = 1;
var limit = 50;

$( "#hostInput" ).submit(function(e){
    e.preventDefault();

    if(document.cookie.split('=')[0] != "token"){
        alert("User not login! Redirecting...");
        window.location.href = "/login.html";
    }
    console.log( document.cookie.split('=')[1]);

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
            "token": document.cookie.split('=')[1],
            "items" : JSON.stringify(items),
            "prices" : JSON.stringify(prices),
            "hours" : JSON.stringify(hours),
        }
        )
        .done(function(data) {
            if(data.success === undefined){
                window.location.href = data;
            }
            else{
                alert("Please login!");
                window.location.href = "/login.html";
            }
            return;
        }).error();

})



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
