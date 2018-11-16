import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
	constructor(props){
    super(props); // <- Always use it, otherwise it won't work.
    console.log('[Persons.js] Inside constructor', props);
  }

  componentWillMount(){
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Persons.js] Inside componentDidMount()');
  }
  
	render(){
		console.log('[Persons.js] Inside render()');
		// Here we change props.persons to this.props.persons
		// because we learned that in component classes props
		// is available through this.
		return this.props.persons.map( (person, index) => {
	    return <Person 
	      click={() => this.props.clicked(index)}
	      name={person.name} 
	      age={person.age}
	      key={person.id}
	      changed={(event) => this.props.changed(event, person.id)} />
	  }); 
	}
}

export default Persons;