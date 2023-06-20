import './App.css';
import 'bulma'
import { FilesUpload } from './components/FilesUpload'
import { Login } from './components/Login'
import { Text } from './components/Text';
import { Translations } from './components/Translations'
import { useState } from 'react';
import { LoggedAs } from './components/LoggedAs';

const user = 'Mike';

let template;

if (user) {
  template = <LoggedAs user={user} />
} else {
  template = <Login />
}

function App() {
  const [currentWord, setCurrentWord] = useState('pink')
  return (
    <div className="container">
      <div className="columns navbar">
        <div className='column background-green'>
          {/* <Wrapper /> */}
        </div>
      </div>
      <div className="columns">
        <div className='column is-one-fifth background-gold'>
          {/* {user && <LoggedAs user={user} />} */}
          {!user && <Login />}
          {template}
          <FilesUpload />
        </div>
        <div className='column is-three-fifths background-pink'>
          <Text onChangeCurrentWord={setCurrentWord} />
        </div>
        <div className='column is-one-fifth background-burlywood'>
          <Translations currentWord={currentWord} />
        </div>
      </div>
      <div className="columns navbar">
        <div className='column background-silver'>
        </div>
      </div>
    </div>
  );
}

export default App;
