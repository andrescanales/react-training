import React, { Component } from 'react';
import './Person.css';

class Person extends Component {
	constructor(props){
    super(props); // <- Always use it, otherwise it won't work.
    console.log('[Person.js] Inside constructor', props);
  }

  componentWillMount(){
    console.log('[Person.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Person.js] Inside componentDidMount()');
  }

	render(){
		console.log('[Person.js] Inside render()');
		return (
			<div className="Person">
				<p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years old!</p>
				{/* Children element are within tags in person component */}
				<p>{this.props.children}</p>
				<input type="text" onChange={this.props.changed} value={this.props.name} />
			</div>
		);
	}
}
export default Person;