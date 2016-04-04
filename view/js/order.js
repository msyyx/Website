//var React = require('react');
//var ReactDOM = require('react-dom');


var FetchOrder = React.createClass( {
  getInitialState: function() {
    return{
      file:''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.url, function(res) {
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
    for (var i = 0; i < order.length; i++) {
      var row = [];
      row.push(order[i].name);
      row.push(order[i]._id);
      table.push(row);
    }
    var tableStyle = {
      border: '1px solid black'
    };
    return (
      //<p> {JSON.stringify(this.props.order)}</p>

      <table style={tableStyle}>

      <thead>
        <td style={tableStyle}> name </td>
        <td style={tableStyle}> id </td>
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




ReactDOM.render(<FetchOrder url = "http://localhost:3000/host/show"/>,document.getElementById("new-div"));
