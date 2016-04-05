
var Header = React.createClass({
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
                                <a href="/login.html">Login</a>
                            </li>
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
                                <a href="/order.html">Order</a>
                            </li>
                            <li>
                                <a href="/Profile.html">Profile</a>
                            </li>
                            <li>
                                <a href="/search.html">Search</a>
                            </li>
                            <li>
                                <a href="/Admin.html">Admin</a>
                            </li>
                            <li>
                                <a href="/host">New host</a>
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
                        <a href="#">Home</a>
                        <a href="#">Link2</a>
                        <a href="#">Link3</a>
                        <a href="#">Link4</a>
                        <a href="#">Link5</a>
                        <a href="#">Link6</a>
                        <a href="#">Link7</a>
                    </div>
                </div>
                <p></p>
                <div className="row"><p>Copyright @2016 by GoodEats. All Rights Reserved.</p></div>
            </div>
        );
    }
});

// Render our react components within the html DOM
ReactDOM.render(<Header/>, document.getElementById('header'));

ReactDOM.render(<Footer/>, document.getElementById('footer'));

