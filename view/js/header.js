
var LoginHeader = React.createClass({
    handleSearch:function(){
      var val = $("#searchVal").val();
        location.href= "search/"+val;
    },
    render: function() {
        return (

            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">TEXT</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">GoodEats</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li>
                                <a href="/register.html">Register</a>
                            </li>
                        </ul>

                        <form className="navbar-form navbar-right" role="search" id ="search">
                            <div className="form-group">
                                <input  id ="searchVal" type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="button" onClick = {this.handleSearch} className="btn btn-default">Submit</button>
                        </form>

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="/login.html"><b>Login</b></a>
                            </li>
                        </ul>

                    </div>
                </div>
            </nav>

        );
    }
});

var LogoutHeader = React.createClass({
    handleSearch:function(){
        var val = $("#searchVal").val();
        location.href= "search/"+val;
    },
    logout: function() {
        console.log("i am here");
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
        document.cookie = cookies[i].split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

            console.log(document.cookies);
    }

    ReactDOM.render(<LoginHeader/>, document.getElementById('header'));
    },
    render: function() {
        return (

            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">

                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className="sr-only">TEXT</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">GoodEats</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">

                            <li>
                                <a href="/newhost.html">New host</a>
                            </li>
                            
                        </ul>

                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a href="/profile.html">Profile</a>
                            </li>
                            <li className="float-right">
                                <a onClick= {this.logout}> Logout</a>
                            </li>
                        </ul>
                        <form className="navbar-form navbar-right" role="search" id ="search">
                            <div className="form-group">
                                <input  id ="searchVal" type="text" className="form-control" placeholder="Search"/>
                            </div>
                            <button type="button" onClick = {this.handleSearch} className="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </nav>

        );
    }
});



var Footer = React.createClass({
    render: function() {
        return (
            <div id="bottom-footer">
                <div className="row">
                    <div className="col-md-12">
                        <a href="#">Computer Science @ University of Toronto</a>
                    </div>
                </div>
                <p></p>
                <div className="row"><p>Copyright @2016 by GoodEats. All Rights Reserved.</p></div>
            </div>
        );
    }
});


var login = false;
var cookie = document.cookie.split(";")

for(var i = 0; i< cookie.length;i++){
    var cookiesItem = cookie[i].split("=");
    cookiesItem[0] = cookiesItem[0].replace(' ', '');
    console.log(cookiesItem[0]);
    if(cookiesItem[0] == "token"){
        login = true;
    }
}
if (login){
    ReactDOM.render(<LogoutHeader/>, document.getElementById('header'));
}else{
    ReactDOM.render(<LoginHeader/>, document.getElementById('header'));
}
// Render our react components within the html DOM

ReactDOM.render(<Footer/>, document.getElementById('footer'));


console.log("wait");