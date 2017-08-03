let chorus = "Don't want to be a fool for you, Just another player in your game for two, You may hate me but it ain't no lie, Baby bye bye bye, Bye bye, I Don't want to make it tough, I just want to tell you that I've had enough, It might sound crazy but it ain't no lie, Baby bye bye bye"

let chorusArray = chorus.split(', ');
let position = 0;

let state = {
  chorusString: chorus,
  chorusArray: chorusArray,
  arrayPosition: position,
  currentPhrase: chorusArray[position]
}

function phraseChanger(state, action) {
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


function displayNewPhrase(state) {
  document.getElementById('words').innerHTML = state.currentPhrase;
}

setTimeout(function () {
  document.getElementById('words').innerHTML = chorusArray[position];
}, 200);

function switchButtonClicked() {
  state = phraseChanger(state, { type:'SWITCH' });
  displayNewPhrase(state);
}
