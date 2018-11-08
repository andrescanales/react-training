import React from 'react';
import './Person.css';

const person = (props) => {
	return (
		<div className="Person">
			<p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!</p>
			{/*Children elemen are withing tags in person component*/}
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</div>
		)
};
export default person;