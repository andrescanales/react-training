import React from 'react';

import './Cockpit.css';

const cockpit = (props) => {

	// Adding dynamically classes depending the status:
  let assignedClasses = [];

  let btnClass = '';
	if (props.showPersons){
		btnClass = 'Red';
	}
  
  if(props.persons.length <= 2){
    assignedClasses.push('red'); //assignedClasses = ['red']
  }

  if(props.persons.length <= 1){
    assignedClasses.push('bold'); //assignedClasses = ['red', 'bold']
  }

	return(
		<div className='Cockpit'>
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
    </div>
	);
};

export default cockpit;