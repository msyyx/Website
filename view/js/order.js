//var React = require('react');
//var ReactDOM = require('react-dom');




var FetchOrder = React.createClass( {
  getInitialState: function() {
    return{
      file:''
    };
  },

  componentDidMount: function() {
    var cookie =  document.cookie.split(';')
    var token;
    var username;
    var loggedIn = false;
    for (var i = 0;i<cookie.length; i++) {
      if (cookie[i].split('=')[0] == "token"){
          token = cookie[i].split('=')[1];

      }
    }
    this.serverRequest = $.post(this.props.url,
      {
      'token' : token
      },
      function(res) {
      var response = res;
      this.setState({
        file : response
      });
    }.bind(this));
  },

  render: function() {
    return (
      //should put everything here in a table
      <DisplayOrder order = {this.state.file} />
    );
  }
});

var DisplayOrder = React.createClass( {

  render: function() {
    var order = this.props.order;

    var table = [];
    console.log(order.length);
    for (var i = 0; i < order.length; i++) {
      var row = [];
      row.push(order[i].userName);
      row.push(order[i].date);
      row.push(order[i].hostName);
      if(order[i].comment == ''){
        row.push(<p><a href = {"/order/comment/" + order[i].hostID}> Write a comment </a></p>);
      }
      else {
        row.push(<p> {order[i].comment} </p>);
      }
      table.push(row);
    }
    var tableStyle = {
      border: '1px solid black',
      margin:  '20px'
    };
    return (
      //<p> {JSON.stringify(this.props.order)}</p>

      <table style={tableStyle}>

      <thead>
        <td style={tableStyle}> Name </td>
        <td style={tableStyle}> Date </td>
        <td style={tableStyle}> HostName </td>
        <td style={tableStyle}> Comment </td>

      </thead>
      <tbody>
      {
        table.map(function(row, i) {
          return (
            <tr style={tableStyle} key = {i}>
            {
              row.map(function(cell,j) {
                return (
                  <td style={tableStyle} key = {j}> {cell} </td>
                );
              })
            }
            </tr>
          );
        })
      }
      </tbody>
      </table>
    );
  }
});

//var timer = setInterval(checkLogin, 10);

//var checkLogin = function() {
  //if(loggedIn) {
  //  window.clearInterval(timer);
  ReactDOM.render(<FetchOrder url = "http://localhost:3000/order/show" />,document.getElementById("new-div"));
