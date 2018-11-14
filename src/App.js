import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'asdf', name: 'Andres', age: 31},
      { id: 'asfs', name: 'Mane', age: 30 },
      { id: 'asdal', name: "Sofi", age: 0}
    ],
    showPersons: false
  }

  // switchNameHandler = (newName) =>{
  //   console.log('Was clicked');
  //   // Don't do this: this.state.persons[0].name = "Ramon Andres";
  //   this.setState({ 
  //     persons: [
  //       { name: newName, age: 31},
  //       { name: 'Mane', age: 31 }
  //     ] 
  //   })
  // }

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
    let btnClass = '';

    // We have changed the ternary conditions to this
    // because is most elegant and also because ternary
    // using in multiple places can lead to issues
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <ErrorBoundary key={person.id}> 
              <Person 
                click={() => this.deletePersonHandler(index)}
                name={person.name} 
                age={person.age}
                changed={(event) => this.nameChangeHandler(event, person.id)} 
              />
            </ ErrorBoundary>
          })}
          
        </div>
      );
      btnClass = 'Red';
    }

    // Adding dynamically classes depending the status:
    let classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red'); //classes = ['red']
    }

    if(this.state.persons.length <= 1){
      classes.push('bold'); //classes = ['red', 'bold']
    }


    return (
      <div className="App">
        <h1>Hi, I'm a react app</h1>
        {/* Here we add a join because className value should be a string and not an array as original is.*/}
        <p className={classes.join(' ')}>This is really working.</p>
        {/*If we call in the onClick={this.switchNameHandler()} with parentesis
          it will be executed inmediately the page load. Without () is just a
          reference. Also check that we can send an anonymous function in the
          onClick, but author says it not as efficient as using bind.
        */}
        <button 
          className={btnClass}
          onClick={() => this.togglePersonsHandler()}>
          Toggle Persons
        </button>
        { 
          persons
          // this.state.showPersons ?
          /*
          JSX Persons harcode elements:
          <Person 
            name={this.state.persons[0].name} 
            age={this.state.persons[0].age}/>
          <Person 
            name={this.state.persons[1].name} 
            age={this.state.persons[1].age}
            click={this.switchNameHandler.bind(this, 'Canales Ibarra')}
            changed={this.nameChangeHandler}>
            Hobbies: Pets
          </Person>
          */
          // : null
        }
      </div>
    );
    // Next commented line is what is translated from return above:
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'));
  }
}

export default App;
