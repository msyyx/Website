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

var cookie =  document.cookie.split(';')
var token;
var username;
var loggedIn = false;
for (var i = 0;i<cookie.length; i++) {
  if (cookie[i].split('=')[0] == "token"){
      token = cookie[i].split('=')[1];

  }
}
$.post( "/profile/load",
            {'token' :token

            }
    )
    .done(function(data) {

      $.get("/profile/"+data._id +"/info").done(function(d){
        username = d.username;
        console.log(d.username);
        loggedIn = true;
      })
    })
    .error(function(err){
      alert("Please log in");
      loggedIn = false;
    })



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

        return {data: {
            items:[],
            prices:[],
            hours:["-","-","-","-","-","-","-"]
        }};
    },
    componentDidMount: function() {
        this.loadInfoFromServer();
    },
    render:function(){
        return(
        <div>
            <Introduction data={this.state.data}/>
            <br/>
            <DetailedInfo data={this.state.data}/>
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

                <p className="pull-right" id="ownerInfo">Host by: <a href= { "/profile/"+ this.props.data.owner}>{this.props.data.ownerName}</a></p>
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
                        <Tab eventKey={1} title="Reviews"><br/><Reviews data={this.props.data}/></Tab>
                        <Tab eventKey={2} title="Order" ><Order data={this.props.data}/></Tab>
                        <Tab eventKey={3} title="Info"><Extra data={this.props.data}/></Tab>
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

                    <b>Mon</b> {this.props.data.hours[0]}<br/>
                    <b>Tue</b> {this.props.data.hours[1]}<br/>
                    <b>Wed</b>	{this.props.data.hours[2]}m<br/>
                    <b>Thu</b>	{this.props.data.hours[3]}<br/>
                    <b>Fri</b>	{this.props.data.hours[4]}<br/>
                    <b>Sat</b>	{this.props.data.hours[5]}<br/>
                    <b>Sun</b>	{this.props.data.hours[6]}<br/><br/>

                    <b>Contact:</b> {this.props.data.contact}
                </div>
        </div>
        </div>
        )
    }
});

var Order = React.createClass({
    getInitialState: function() {
        return {myOrder: {
            indexes:[],
            items:[],
            prices:[],
            total: 0
        }};
    },

  HandleClick: function(event) {
    /*var cookie =  document.cookie.split(';')
    var token;
    var username;
    for (var i = 0;i<cookie.length; i++) {
      if (cookie[i].split('=')[0] == "token"){
          token = cookie[i].split('=')[1];

      }
    }
    $.post( "/profile/load",
                {'token' :token

                }
        )
        .done(function(data) {

          $.get("/profile/"+data._id +"/info").done(function(d){
            username = d.username;
            console.log(d.username);
          })
        })
        .error(function(err){
          alert("Please log in");
        })*/
    if(!loggedIn){
          alert("please log in first");
        }
    else {
    console.log("placeOrder clicked");
    var str = document.URL;
    str = str.split('/');
    var id = str[str.length - 1];
    console.log("id: " + id);

    var date = new Date();
    var dateStr = date.getFullYear() + '.' + date.getMonth() + '.' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();

    var orderDetail = {name: 2333, quantity: 6666};
    var hostID = document.URL;
    hostID = hostID.split('/');
    hostID = hostID[hostID.length - 1];

    $.post("/order/add", {
      "id": hostID,
      "date" : dateStr,
      "orderDetail" : JSON.stringify(orderDetail),
      "username" : username
    })
    .success(function(res) {
      alert("OrderPlaced");
    })
    .error(function(res) {
      alert("db error");
    });
  }},
    AddItem: function(index){
        this.state.myOrder.indexes.push(index);
        this.state.myOrder.items.push(this.props.data.items[index]);
        this.state.myOrder.prices.push(this.props.data.prices[index]);
        this.state.myOrder.total += this.props.data.prices[index];
        this.setState({myOrder: this.state.myOrder});
    },
    RemoveItem: function(index){
        this.state.myOrder.total -= this.state.myOrder.prices[index];
        this.state.myOrder.indexes.splice(index, 1);
        this.state.myOrder.items.splice(index, 1);
        this.state.myOrder.prices.splice(index, 1);
        this.setState({myOrder: this.state.myOrder});
    },

    render: function(){
      var clickHandler = this.HandleClick;

        return(
            <div>
                <div role="tabpanel" className="tab-pane" id="order">

                    <table>
                        <tbody>
                        <tr>
                            <td><b>Item</b></td>
                            <td><b>Price</b></td>
                            <td> </td>
                        </tr>
                        {this.props.data.items.map(function(item, i){
                            return(
                                <tr key={i}><td>{i+1}.{item}</td><td>{this.props.data.prices[i]}</td><td>
                                    <button type="button" className="btn btn-warning" onClick = {this.AddItem.bind(this , i)}>+</button></td></tr>
                            )
                        }.bind(this))
                        }
                        </tbody>
                    </table>
                    <hr/>
                    <h3>My Order</h3>
                    <table id="myOrderTbl"><tbody>
                    {this.state.myOrder.indexes.map(function(num, i){
                        return(
                            <tr key={i}><td>{num + 1}.{this.state.myOrder.items[i]}</td><td>{this.state.myOrder.prices[i]}</td><td>
                                <button type="button" classNasme="btn btn-warning" onClick = {this.RemoveItem.bind(this , i)}>-</button></td></tr>
                        )
                    }.bind(this))
                    }
                    <tr>
                    <td></td><td></td><td><b>Total: ${this.state.myOrder.total}</b></td></tr>

                    </tbody> </table>
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
