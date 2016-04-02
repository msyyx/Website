var HostInfo = React.createClass({
    loadInfoFromServer: function() {
        $.ajax({
            url: document.URL + "/info",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(document.URL + "/info", status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    render:function(){
        return(
        <div>
            <Introduction/>
            <br/>
            <DetailedInfo/>
        </div>
        )
    },

});


var Introduction = React.createClass({


    render: function() {

        return (
            <div>
            <img className="img-responsive" src="https://www.procook.com.au/new/wp-content/uploads/2015/01/spicy-grilled-non-vegetarian-meat-food.jpg" alt=""/>
                <div className="caption-full">
                    <h2>Any Host Name</h2>
                    <p>Host Introduction and blah blah blah...</p>
                    <p>Pretend this to be a paragraph </p>
                </div>
                <div className="ratings">
                    <p className="pull-right">3 reviews</p>
                    <p>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star-empty"></span>
                        4.0 stars
                    </p>
                </div>
        </div>
        );
    }

});

var DetailedInfo = React.createClass({
    render: function(){
        return(
            <div className = "well">
                <div className="row">
                <ul className="nav nav-tabs" role="tablist" id="menu">
                    <li role="presentation" className="active"><a href="#reviews" aria-controls="reviews" role="tab" data-toggle="tab">Reviews</a></li>
                    <li role="presentation"><a href="#order" aria-controls="order" role="tab" data-toggle="tab">Order</a></li>
                    <li role="presentation"><a href="#info" aria-controls="info" role="tab" data-toggle="tab" id="mapTrigger">Info</a></li>
                </ul>
                </div>
                <div className = "tab-content">
                    <Reviews/>
                    <Order/>
                    <Extra/>
                </div>
                <br/>

            </div>

        );
    }


});


var Reviews = React.createClass({
    render: function(){
        return (
        <div>
            <div role="tabpanel" className="tab-pane active" id="reviews">
                <div className="row">
                    <div className="col-md-12">
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star"></span>
                        <span className="glyphicon glyphicon-star-empty"></span>
                        Anonymous
                        <span className="pull-right">- days ago</span>
                        <p></p>
                        <p>Small coffee shop but has the most delicious coffee!! Had the Brazil in the form of a latte and was blown away by how smooth it was!!! The place is tiny with no more than 10 seats with limited table space, so it's definitely more of a pick up and go type of place. If you're lucky to find a free spot, the decor is simple and quite bright. However, there are so many people coming in and out so it might be hard to have a conversation. They also have water at the side for sit in guests to enjoy, which I thought was a nice bonus.</p>
                    </div>
                </div>

                <hr/>

                    <div className="row">
                        <div className="col-md-12">
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star"></span>
                            <span className="glyphicon glyphicon-star-empty"></span>
                            Anonymous
                            <span className="pull-right">- days ago</span>
                            <p></p>
                            <p>Will come again!</p>
                            <p>One of the best coffee shops in Toronto. Single-origin beans, rich with flavor are used for their crafted drinks and pour-overs.!</p>
                        </div>
                    </div>

                    <hr/>

                        <div className="row">
                            <div className="col-md-12">
                                <span className="glyphicon glyphicon-star"></span>
                                <span className="glyphicon glyphicon-star"></span>
                                <span className="glyphicon glyphicon-star"></span>
                                <span className="glyphicon glyphicon-star"></span>
                                <span className="glyphicon glyphicon-star-empty"></span>
                                Anonymous
                                <span className="pull-right">- days ago</span>
                                <p></p>
                                <p>Love this! blah blah blah blah</p>
                            </div>
                        </div>
            </div>
        </div>
        )
    }

});

var Order = React.createClass({
    render: function(){
        return(
        <div>
            <div role="tabpanel" className="tab-pane" id="info">

                <div id="map"></div>

                <div id="hour">
                    <h3>Hours:</h3>

                    <b>Mon</b>	7:00 am - 6:00 pm<br/>
                    <b>Tue</b>	7:00 am - 6:00 pm<br/>
                    <b>Wed</b>	7:00 am - 6:00 pm<br/>
                    <b>Thu</b>	7:00 am - 6:00 pm<br/>
                    <b>Fri</b>	7:00 am - 6:00 pm<br/>
                    <b>Sat</b>	9:00 am - 5:00 pm<br/>
                    <b>Sun</b>	9:00 am - 3:00 pm<br/><br/>

                    <b>Contact:</b> (416)-666-6666
                </div>
        </div>
        </div>
        )
    }

});

var Extra = React.createClass({

    render: function(){
        return(
            <div>
                <div role="tabpanel" className="tab-pane" id="order">
                    <ul className="item-list">
                        <li><div className="row">
                            Hamburger XII ver.<button type="button" className="btn btn-warning">+</button>
                        </div>
                        </li>
                        <li><div className="row bg">
                            Hamburger X ver.<button type="button" className="btn btn-warning">+</button>
                        </div>
                        </li>
                        <li><div className="row">
                            66666666.<button type="button" className="btn btn-warning">+</button>
                        </div>
                        </li>

                        <li><div className="row bg">
                            233333333333<button type="button" className="btn btn-warning">+</button>
                        </div>
                        </li>
                    </ul>

                    <hr/>
                        <div className="row">
                            <button type="button" className="btn btn-warning">Place Order</button>
                        </div>
                </div>
            </div>
        )
    }

});

ReactDOM.render(<HostInfo/>, document.getElementById('HostInfo'));