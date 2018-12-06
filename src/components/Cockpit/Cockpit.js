import React from 'react';

import './Cockpit.css';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {

	// Adding dynamically classes depending the status:
  let assignedClasses = [];

  let btnClass = 'Button';
	if (props.showPersons){
		btnClass = ['Button', 'Red'].join(' ');
	}
  
  if(props.persons.length <= 2){
    assignedClasses.push('red'); //assignedClasses = ['red']
  }

  if(props.persons.length <= 1){
    assignedClasses.push('bold'); //assignedClasses = ['red', 'bold']
  }

	return(
		// Adding a higher order component. This is done beacuse sometimes 
		// you don't need to another html tag(<div>) for your component for
		// styling issues
		<Aux>
			<h1>{ props.appTitle }</h1>
	    {/* Here we add a join because className value should be a string and not an array as original is.*/}
	    <p className={assignedClasses.join(' ')}>This is really working.</p>
	    {/*If we call in the onClick={this.switchNameHandler()} with parentesis
	      it will be executed inmediately the page load. Without () is just a
	      reference. Also check that we can send an anonymous function in the
	      onClick, but author says it not as efficient as using bind.
	    */}
	    <button 
	      className={btnClass}
	      onClick={() => props.clicked()}>
	      Toggle Persons
	    </button>
	    <button onClick={props.login}>Log in</button>
    </Aux>
	);
};

// React.memo will check if the props recieved up there have really changed if 
// not then it will not re-render
export default React.memo(cockpit);