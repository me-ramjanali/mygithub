import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component{
	constructor(props){
		super(props);
		this.state = {
			username: 'me-ramjanali',
			userData: [],
			userRepos: [],
			perPage: 5
		}
	}

	// Ger user data from github
	getUserData(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'?client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret,
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userData: data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({username: null});
				alert(error);
			}.bind(this)
		});
	}

	// Ger user repos
	getUserRepos(){
		$.ajax({
			url: 'https://api.github.com/users/'+this.state.username+'/repos?per_page='+this.state.perPage+'client_id='+this.props.clientId+'&client_secret='+this.props.clientSecret+'&sort=created',
			dataType: 'json',
			cache: false,
			success: function(data){
				this.setState({userRepos: data});
			}.bind(this),
			error: function(xhr, status, error){
				this.setState({username: null});
				alert(error);
			}.bind(this)
		});
	}

	handleFormSubmit(username){
		this.setState({username: username}, function(){
			this.getUserData();
			this.getUserRepos();
		});
	}

	componentDidMount(){
		this.getUserData();
		this.getUserRepos();
	}

	render(){
		return(
			<div>
				<Search onFormSubmit = {this.handleFormSubmit.bind(this)} />
				<Profile {...this.state} />
			</div>
		)
	}
}

App.propTypes = {
	clientId: React.PropTypes.string,
	clientSecret: React.PropTypes.string
};

App.defaultProps = {
	clientId: '8822548bc5cb6382055a',
	clientSecret: 'bec5847cf8615778f99b6bbe7cc3becb113e556f'
};

export default App