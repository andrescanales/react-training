import React, { PureComponent } from 'react';
import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  // Execution order: 1st.
  constructor(props){
    // Only in the constructor of a class we can call props
    // without using this before it. Everywhere else use with
    // this statement.
    // props.title
    super(props); // <- Always use it, otherwise it won't work.
    console.log('[App.js] Inside constructor', props);
    // Implementing this.state here is not recommended but possible.
    this.state = {
        persons: [
          { id: 'asdf', name: 'Andres', age: 31},
          { id: 'asfs', name: 'Mane', age: 30 },
          { id: 'asdal', name: "Sofi", age: 0}
        ],
        showPersons: false,
        toggleClicked: 0,
        authenticated: false
    }
  }

  // Execution order: 2nd.
  componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
  }

  // Execution order: 4rd.
  componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }

  // Check in Persons.js why we're not implementing this anymore:
  // shouldComponentUpdate(nextProps, nextState){
  //   // Update 1 of internal update by state
  //   console.log('[UPDATE App.js] Inside shouldComponentUpdate', nextProps, nextState);
  //   return nextState.persons !== this.state.persons ||
  //     nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState){
    console.log('[UPDATE App.js] Inside componentWillUpdate', nextProps, nextState);
  }

  // New hook of the lifelcycle provided since React 16.3:
  // This is executed whenever your props are updated and also gives you the 
  // chance to update the state in it.
  static getDerivedStateFromProps(nextProps, prevState){
    console.log('[Update App.js] Inside getDerivedStateFromProps', nextProps, prevState);
    return prevState;
  }

  // New lifecycle hook: This will give us the chance to get 
  // a snapshot of our DOM before update
  getSnapshotBeforeUpdate(){
    console.log('[Update App.js] Inside getSnapshotBeforeUpdate');
  }

  componentDidUpdate(){
    console.log('[UPDATE App.js] Inside componentDidUpdate');
  }

  // state = {
  //   persons: [
  //     { id: 'asdf', name: 'Andres', age: 31},
  //     { id: 'asfs', name: 'Mane', age: 30 },
  //     { id: 'asdal', name: "Sofi", age: 0}
  //   ],
  //   showPersons: false
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

    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
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
    // Remember that this.setState is executed async by react.
    this.setState((prevState, props) => {
      return {
        showPersons: !doesShow, 
        // Better way to update toggleClicked:
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  // Execution order: 3rd.
  render() {
    console.log('[App.js] Inside render()');
    let persons = null;

    // We have changed the ternary conditions to this
    // because is most elegant and also because ternary
    // using in multiple places can lead to issues
    if(this.state.showPersons){
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
        />
      );
    }


    return (
      // We replace our div tag for HOC
      <WithClass classes='App'>
        <button onClick={() => {this.setState({showPersons: true})}}>Show Persons</button>
        <Cockpit 
          appTitle={this.props.title}
          showPersons={this.state.showPersons} 
          persons={this.state.persons}
          login={this.loginHandler}
          clicked={this.togglePersonsHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          { 
            persons
            // this.state.showPersons ?
            // : null
          }
        </AuthContext.Provider>
      </WithClass>
    );
    // Next commented line is what is translated from return above:
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work?'));
  }
}

export default App;
