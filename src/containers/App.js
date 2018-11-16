import React, { Component } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    persons: [
      { id: 'asdf', name: 'Andres', age: 31},
      { id: 'asfs', name: 'Mane', age: 30 },
      { id: 'asdal', name: "Sofi", age: 0}
    ],
    showPersons: false
  }

  deletePersonHandler = (personIndex) =>{
    // We're going to modify a const but that is because 
    //the const is only pointing to the array.
    // const persons = this.state.persons;

    // Also when doing splice we're mutating(chaging) the
    // original data, but this can lead to unpredictable 
    // apps. So we're going to create a copy of the data
    // before manipulating with slice() or the commented 
    // next line to slice which is the spread operator.

    const persons = this.state.persons.slice();
    // const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  nameChangeHandler = (event, id) => {
    // First we find the index that will be modified
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // Then we create a copy of the original object to
    // not manipulate the state of the original one.
    const person = {
      ...this.state.persons[personIndex]
    };

    // We set up the new name which is in the value of
    // the event.target which is simply the input.
    person.name = event.target.value;
    // Persons will be the new object with the new value.
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    let persons = null;

    // We have changed the ternary conditions to this
    // because is most elegant and also because ternary
    // using in multiple places can lead to issues
    if(this.state.showPersons){
      persons = <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler} />;
    }


    return (
      <div className="App">
        <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          clicked={this.togglePersonsHandler} />
        { 
          persons
          // this.state.showPersons ?
          // : null
        }
      </div>
    );
    // Next commented line is what is translated from return above:
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'));
  }
}

export default App;
