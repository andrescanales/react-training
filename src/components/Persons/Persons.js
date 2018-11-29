import React, { PureComponent } from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {
	constructor(props){
    super(props); // <- Always use it, otherwise constructor won't work.
    console.log('[Persons.js] Inside constructor', props);
  }

  componentWillMount(){
    console.log('[Persons.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[Persons.js] Inside componentDidMount()');
  }

  componentWillReceiveProps(nextProps){
  	// Update 1
  	console.log('[UPDATE Persons.js] Inside componentWillReceiveProps', nextProps);
  }

  // We're commenting this to implement PureComponent which basically
  // have shouldComponentUpdate checks(the return comparisions) 
  // internally built in.

  // shouldComponentUpdate(nextProps, nextState){
  // 	// Update 2
  // 	console.log('[UPDATE Persons.js] Inside shouldComponentUpdate', nextProps, nextState);
  // 	// This method always needs to return true or false, if false the DOM update will stop
  // 	// return false;
  // 	return nextProps.persons !== this.props.persons || 
  // 		nextProps.changed !== this.props.changed ||
  // 		nextProps.clicked !== this.props.clicked;
  // 	// Don't do return true here because it will render all the update methods even tough nothing changes
  // 	// which is a performance issue, instead evaluate if nextProps is diff from props original:
  // 	// return true;
  // }

  componentWillUpdate(nextProps, nextState){
  	// Update 3
  	console.log('[UPDATE Persons.js] Inside componentWillUpdate', nextProps, nextState);
  }

  componentDidUpdate(){
  	// Here we don't have props or state because it is exec after update
  	// Update 5
  	console.log('[UPDATE Persons.js] Inside componentDidUpdate');

  }

	render(){
		// Update 4
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