import React, { Component } from 'react';

import Person from './Person/Person';

class Persons extends Component {
	render(){
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