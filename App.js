import { useReducer } from 'react';
import Navbar from './Authcomponent/Navbar';
import { Authcontext } from './context_api(redux)/create_context/authcontext';
import { authInitialstate } from './context_api(redux)/initialstates/authinitialstate';
import authreducer from './context_api(redux)/Reducer/authReducer';
import Urls from './Urls';


const App = () => {

  const [state, dispatch] = useReducer(authreducer, authInitialstate);

  return (
    <Authcontext.Provider value={{ "state": state, "dispatch": dispatch }}>
      <div className="App">
        <Navbar />
        <Urls />
      </div>
    </Authcontext.Provider>
  );
}

export default App;
