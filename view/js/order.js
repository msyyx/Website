//var React = require('react');
//var ReactDOM = require('react-dom');
var Entry = React.createClass( {
  render: function() {
    return(
      <table>
      <tbody>
      <tr>
        <td>Kitchen</td>
        <td>Ordered at</td>
        <td>Rating</td>
        <td>Review</td>
      </tr>
      <tr>
                <td>Deadpool</td>
                <td>03/04/2016</td>
                <td>94</td>
                <td><button class="review">Write a review </button></td>

      </tr>
      <tr>
                <td>Deadpool</td>
                <td>03/04/2016</td>
                <td>94</td>
                <td><button class="review">Write a review </button></td>

      </tr>
      </tbody>
      </table>

  );
  }
});

var Try = React.createClass( {
  getInitialState: function() {
    return{
      file:''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.url, function(res) {
      var response = res;
      this.setState({
        file : response[0]._id
      });
    }.bind(this));
  },

  render: function() {
    return (
      //should put everything here in a table
      <div> {this.state.file} </div>
    );
  }
});


ReactDOM.render(<Try url = "http://localhost:3000/host/show"/>,document.getElementById("new-div"));
