var Tabs = ReactBootstrap.Tabs;
var Tab = ReactBootstrap.Tab;

var map;
var toronto = {lat: 43.700 , lng: -79.410};

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 11,
        center: toronto
    });

    var marker = new google.maps.Marker({
        position: toronto,
        map: map,
        title: 'location!'
    });
}

function mapResize(){
    console.log("?");
    google.maps.event.trigger(map, 'resize');
    map.setCenter(toronto);
}

var HostInfo = React.createClass({

    loadInfoFromServer: function() {
        $.ajax({
            url: document.URL + "/info",
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(document.URL + "/info", status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {

        return {data: []};
    },
    componentDidMount: function() {
        this.loadInfoFromServer();
    },
    render:function(){
        return(
        <div>
            <Introduction data={this.state.data}/>
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
                    <h2>{this.props.data.name}</h2>
                    <p>{this.props.data.description}</p>

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
    getInitialState() {
        return {
            key: 3
        };
    },
    handleSelect(k) {
        mapResize();
        this.setState({key : k});
    },

    render: function(){
        return(
            <div className = "well">

                <div className="row">
                    <Tabs activeKey={this.state.key} onSelect={this.handleSelect}>
                        <Tab eventKey={1} title="Reviews"><br/><Reviews/></Tab>
                        <Tab eventKey={2} title="Order" ><Order/></Tab>
                        <Tab eventKey={3} title="Info"><Extra/></Tab>
                    </Tabs>
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

var Extra = React.createClass({
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

var Order = React.createClass({

  HandleClick: function(event) {
    console.log("placeOrder clicked");
    var str = document.URL;
    str = str.split('/');
    var id = str[str.length - 1];
    console.log("id: " + id);

    var date = new Date();
    var dateStr = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

    var orderDetail = {name: 2333, quantity: 6666};

    $.post("/order/add", {
      "id": document.URL,
      "date" : dateStr,
      "orderDetail" : JSON.stringify(orderDetail),
      "username" : "hgkjfklds"
    })
    .success(function(res) {
      alert("OrderPlaced");
    })
    .error(function(res) {
      alert("db error");
    });
  },


    render: function(){
      var clickHandler = this.HandleClick;
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
                            233333333333<button type="button"  className="btn btn-warning">+</button>
                        </div>
                        </li>
                    </ul>

                    <hr/>
                        <div className="row">
                            <button type="button" id = "placeOrder" onClick = {clickHandler} className="btn btn-warning">Place Order</button>
                        </div>
                </div>
            </div>
        )
    }

});

/*$("#placeOrder").on('click', function(e) {
  console.log("placeOrder clicked");
  var str = document.URL;
  str = str.split('/');
  var id = str[str.length - 1];
  console.log("id: " + id);

  var date = new Date();
  var dateStr = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

  var orderDetail = {name: 2333, quantity: 6666};

  $.post("/order/add", {
    "id": document.URL,
    "date" : dateStr,
    "orderDetail" : JSON.stringify(orderDetail),
    "username" : "hgkjfklds"
  })
  .success(function(res) {
    alert("OrderPlaced");
  })
  .error(function(res) {
    alert("db error");
  });
});*/

ReactDOM.render(<HostInfo/>, document.getElementById('HostInfo'));
google.maps.event.addDomListener(window, 'load', initMap);
