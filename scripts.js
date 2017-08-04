let chorus = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye"

let chorusArray = chorus.split(', ');
let position = 0;

let initialState = {
  chorusString: chorus,
  chorusArray: chorusArray,
  arrayPosition: position,
  currentPhrase: chorusArray[position]
}

function phraseChanger(state = initialState, action) {
  switch (action.type) {
    case 'SWITCH':
      if (state.arrayPosition < state.chorusArray.length - 1) {
        let newPosition = state.arrayPosition + 1;
        let newPhrase = state.chorusArray[newPosition];
        const newState = {
          chorusString: state.chorusString,
          chorusArray: state.chorusArray,
          arrayPosition: newPosition,
          currentPhrase: newPhrase
        }
        return newState;
      } else {
        action.type = 'RESTART';
      }
    case 'RESTART':
      const newState = {
        chorusString: state.chorusString,
        chorusArray: state.chorusArray,
        arrayPosition: 0,
        currentPhrase: state.chorusArray[0]
      }
      return newState;
    default:
      return state;
  }
}

const { createStore } = Redux;
const store = createStore(phraseChanger);
console.log(store.getState());
store.dispatch({ type: 'SWITCH' })
console.log(store.getState());
store.subscribe(() => {
  document.getElementById('words').innerHTML = store.getState().currentPhrase;
});

window.onload = function() {
  document.getElementById('words').innerHTML = store.getState().currentPhrase;
}


function switchButtonClicked() {
  store.dispatch({ type: 'SWITCH' })
}
