
var LoginHeader = React.createClass({
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
                        <a className="navbar-brand" href="/">PlatformName</a>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-left">
                            <li>
                                <a href="/register.html">Register</a>
                            </li>
                            <li>
                                <a href="/main.html">Home</a>
                            </li>
                            <li>
                                <a href="/HostPage.html">Host Page </a>
                            </li>
                            
                            <li>
                                <a href="/search.html">Search</a>
                            </li>
                            <li className="pull-right">
                                <a href="/login.html">Login</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
});

var LogoutHeader = React.createClass({

    logout: function() {
    console.log("i am here");
    document.cookie = '';
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
                                <a href="/HostPage.html">Host</a>
                            </li>
                            <li>
                                <a href="/profile.html">Profile</a>
                            </li>
                            <li>
                                <a href="/main.html">Home</a>
                            </li>
                            
                            <li>
                                <a href="/search.html">Search</a>
                            </li>
                            <li>
                                <a href="/newhost.html">New host</a>
                            </li>
                             
                            <li className="pull-right">
                                <a onClick= {this.logout}> Logout</a>
                            </li>
                            
                        </ul>   
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

