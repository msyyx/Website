var searchCtx = document.URL.split('/');
searchCtx = searchCtx[searchCtx.length -1];

console.log(searchCtx);
var SearchResult = React.createClass({
    getInitialState: function() {
        return {data: {keyword:"-", list:[]}};
    },
    loadInfoFromServer: function() {
        $.ajax({
            url: "/host/search/" + searchCtx ,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.state.data.list =data;
                this.setState({data: this.state.data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error("/search", status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function() {
        this.loadInfoFromServer();
    },
    render:function(){
        return(
            <div>
                <h4>Searching: {this.state.data.keyword}</h4>
                <p>{this.state.data.list.length} results were found.</p>
                <hr/>
            <table>
                <tbody>
                <td> <b>Name</b></td><td><b>Contact</b></td>
                {this.state.data.list.map(function(result, i){
                    return(
                    <tr key={i}>
                    <td> <a href= { "/host/"+ result._id}>{result.name}</a></td><td>{result.contact}</td>
                    </tr>
                    )
                 })
                }

                </tbody>
            </table>
        </div>
        )
    }
});

ReactDOM.render(<SearchResult/>, document.getElementById('table'));


    $( "#search-form" ).submit(function(e){
    e.preventDefault();
    var toSearch = $("#food").val();
    console.log(toSearch);
    window.location.href = "/search/"+toSearch;
});

