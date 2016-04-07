
var FetchOrder = React.createClass( {
  getInitialState: function() {
    return{
      file:''
    };
  },

  componentDidMount: function() {
    console.log(this.props.url);
    var username;
    var loggedIn = false;


    var token = null;
    var cookie = document.cookie.split(';');

  if(cookie!= undefined){
      for (var i = 0;i<cookie.length; i++) {
          var name = cookie[i].split('=')[0].replace(' ' ,'');
          if (name == "token"){
              token = cookie[i].split('=')[1];

          }
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
        <DisplayOrder order = {this.state.file} comment = {this.props.comment} />
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
      row.push(order[i].orderDetail);
      row.push(order[i].hostOwner);
      if (this.props.comment == "yes"){
        if(order[i].comment == ''){
          row.push(<p><a href = {"/order/comment/" + order[i].hostID}> Write a comment </a></p>);
        }
        else {
          row.push(<p> {order[i].comment} </p>);
        }
      }

      table.push(row);
    }
    var tableStyle = {
      border: '1px solid black',
      margin:  '20px'
    };
    return (
      //<p> {JSON.stringify(this.props.order)}</p>

      <table className = 'table' >

      <thead className = 'thead'>
        <td > Name </td>
        <td > Date </td>
        <td > HostName </td>
        <td> Detail </td>
        <td> hostOwner </td>
        
        <td > Comment </td>


      </thead>
      <tbody className = 'tbody'>
      {
        table.map(function(row, i) {
          return (
            <tr  key = {i}>
            {
              row.map(function(cell,j) {
                return (
                  <td  key = {j}> {cell} </td>
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


  ReactDOM.render(<FetchOrder url = "http://localhost:3000/order/show"  comment = "yes"/>,document.getElementById("new-div"));
  ReactDOM.render(<FetchOrder url = "http://localhost:3000/order/myorder" comment = "no" />,document.getElementById("new-div2"));
