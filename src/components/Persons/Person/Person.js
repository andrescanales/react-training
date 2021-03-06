import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Person.css';
import WithClass from '../../../hoc/WithClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
	constructor(props){
    super(props); // <- Always use it, otherwise it won't work.
    console.log('[Person.js] Inside constructor', props);
    this.inputElement = React.createRef();
  }

  componentWillMount(){
    console.log('[Person.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Person.js] Inside componentDidMount()');
    if (this.props.position === 0){
    	this.inputElement.current.focus();
    }
  }

	render(){
		console.log('[Person.js] Inside render()');
		return (
			<WithClass classes='Person'>
				<AuthContext.Consumer>
					{auth => auth === true ? <p>Welcome user!</p> : null}
				</AuthContext.Consumer>
				<p onClick={this.props.click}>I'm a {this.props.name} and I am {this.props.age} years old!</p>
				{/* Children element are within tags in person component */}
				<p>{this.props.children}</p>
				<input 
					ref={this.inputElement}
					type="text" 
					onChange={this.props.changed} 
					value={this.props.name} />
			</WithClass>
		);
	}
}

Person.propTypes = {
	click: PropTypes.func,
	name: PropTypes.string,
	age: PropTypes.number,
	changed: PropTypes.func
};
export default Person;