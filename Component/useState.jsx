// const MyReact = (() => {
//   let _state;

//   function useState(initialState) {

//     _state = _state === undefined ? initialState : _state;
//     const _setState = (newState) => {
//       if(typeof newState === 'function') {
//         _state = newState(_state);
//       } else {
//         _state = newState;
//       }
//       render();
//     };

//     return [_state, _setState];
//   }

//   return {
//     useState
//   }
// })();

const MyReact = (() => {
  const states = [],
        stateSetters = [];
  let stateIndex = 0;

  function createState(initialState, stateIndex) {
    return states[stateIndex] === undefined ? initialState : states[stateIndex];
  }

  function createStateSetter(stateIndex) {
    return function(newState) {
      if(typeof newState === 'function') {
        states[stateIndex] = newState(states[stateIndex]);
      } else {
        states[stateIndex] = newState;
      }
      render();
    }
  }

  function useState(initialState) {
    states[stateIndex] = createState(initialState, stateIndex);
    if(!stateSetters[stateIndex]) {
      stateSetters.push(createStateSetter(stateIndex));
    }

    const _state = states[stateIndex];
    const _setState = stateSetters[stateIndex];

    stateIndex++;

    return [_state, _setState];
  }

  function render() {
    stateIndex = 0;
    ReactDOM.render(<Index />, document.getElementById('root'));
  }

  return {
    useState
  }

})();

const {useState} = MyReact;

function Index() {
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <h1>{count}</h1>
      <h2>现在是在{flag ? 'add' : 'desc'}</h2>
      <button 
        onClick={() => {
          setCount(count + 1);
          setFlag(true);
        }}
      >【+1】
      </button>
      <button 
        onClick={() => {
          setCount(count => count - 1);
          setFlag(false);
        }}
      >【-1】
      </button>
    </div>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));