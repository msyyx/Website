window.onload =function(){
    var cookie =  document.cookie.split(';')
    var token;
    //get token from cookie
    for (var i = 0;i<cookie.length; i++) {
        var name = cookie[i].split('=')[0].replace(' ','');
      if (name == "token"){
          token = cookie[i].split('=')[1];

      }
    };
    //check token avaliable
    $.post( "/profile/load",
                {'token' :token

                }
        )
        .done(function(data) {
            //get user profile by user id
          $.get("/profile/"+data._id +"/info").done(function(d){

            //console.log(d);
            
            $("#Name").text(d.name);
            $("#Username").text("Username :  "+d.username);
            $("#Email").text("Email :  " + d.email);
            $("#Birthdate").text("Birthdate :  "+d.dateofbirth);
            //$("#recently").text(d.recentlyvisit);
        });

        })
        .fail(function() {
          alert("Please log in first ");
            window.location.href='/login.html';
        });
        //update user profile with user id
        $( "#profileInput" ).submit(function(e){
        e.preventDefault();
        var values = $(this).serialize();
        var cookie =  document.cookie.split(';')
         var token;
         for (var i = 0;i<cookie.length; i++) {
          var name = cookie[i].split('=')[0].replace(' ','');
          if (name == "token"){
          token = cookie[i].split('=')[1];

          }
         };
        $.post( "/profile/load",
                {'token' :token
                
                }
        )
        .done(function( data ) {
          console.log(data);
          $.ajax( {
                  url:"/profile/update",
                  type:"PUT",
                  data:{    
                     "_id" : data._id,
                     "name" : $( "#name" ).val(),
                     "email":$( "#email" ).val(),
                     "dateofbirth":$("#birthdate").val()}
         }).done(function(token){
          alert("updated!");
         window.location.href='/profile.html';
          }).fail(function(d){
            alert("gg");
          });

       });
        
    

    });
    }
function change(){
  $('#editprofile').show();
  $('#profile').hide();
  $('#username').append($('#Username').text());
}

 