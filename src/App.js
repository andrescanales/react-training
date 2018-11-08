import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Andres', age: 31},
      { name: 'Mane', age: 30 }
    ],
    showPersons: false
  }

  switchNameHandler = (newName) =>{
    console.log('Was clicked');
    // Don't do this: this.state.persons[0].name = "Ramon Andres";
    this.setState({ 
      persons: [
        { name: newName, age: 31},
        { name: 'Mane', age: 31 }
      ] 
    })
  }

  nameChangeHandler = (event) => {
    this.setState({ 
      persons: [
        { name: 'RAMON', age: 31},
        { name: event.target.value, age: 31 }
      ] 
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    // We have changed the ternary conditions to this
    // because is most elegant and also because ternary
    // using in multiple places can lead to issues
    if(this.state.showPersons){
      persons = (
        <div>
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
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hi, I'm a react app</h1>
        <p>This is really working.</p>
        {/*If we call in the onClick={this.switchNameHandler()} with parentesis
          it will be executed inmediately the page load. Without () is just a
          reference. Also check that we can send an anonymous function in the
          onClick, but author says it not as efficient as using bind.
        */}
        <button 
          style={style}
          onClick={() => this.togglePersonsHandler()}>
          Toggle Persons
        </button>
        { 
          persons
          // this.state.showPersons ?
          /*
          <div>
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
          </div>
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
