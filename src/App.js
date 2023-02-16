import './App.css';
import 'bulma'
import FileUploadSingle from './form.jsx'

function App() {
  return (
    <div className="container">
      <div className="columns navbar">
        <div className='column background-green'></div>
      </div>
      <div className="columns">
        <div className='column is-one-fifth background-gold'>
          <Login/>
          <FileUploadSingle/>
        </div>
        <div className='column is-three-fifths background-pink'>
          <Text/>
        </div>
        <div className='column is-one-fifth background-burlywood'></div>
      </div>
      <div className="columns navbar">
        <div className='column background-silver'></div>
      </div>
    </div>
  );
}

function SignUp() {
  return (
    <div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Username</label>
          <input className="input" type="text"></input>
        </div>
      </div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Password</label>
          <input className="input" type="password"></input>
        </div>
      </div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Email</label>
          <input className="input" type="email"></input>
        </div>
      </div>
    </div>
  )
};

function Login() {
  return (
    <div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Username</label>
          <input className="input" type="text"></input>
        </div>
      </div>

      <div className="filed">
        <div className="control">
          <label className="label is-sucess">Password</label>
          <input className="input" type="password"></input>
        </div>
      </div>

    </div>
  )
}

// function UploadFile() {
//   return (
//     <div className="field">
//         <div className="file">
//           <label className="file-label">
//             <input className="file-input" type="file" name="resume"/>
//             <span className="file-cta">
//              <span className="file-icon">
//             <i className="fas fa-upload"></i>
//           </span>
//           <span className="file-label">
//             Upload
//           </span>
//         </span>
//       </label>
//     </div>
// </div>
//   )
// }


function Word(props) {
  return (
    <span>{props.word}</span>
  )
}

function Text() {
  const testArrayOfWords = ['Nic dwa razy',
  'Nic dwa raz się nie zdarza',
  'i nie zdarzy. Z tej przyczyny',
  'zrodziliśmy sie bez wprawy',
  'i pomrzemy bez rutyny.',
  'Choćbyśmy uczniami byli',
  'najtępszymi w szkole świata',
  'nie będziemy repetować',
  'żadnej zimy ani lata.',
  'Żaden dzień się nie powtórzy,',
  'nie ma dwóch tych samych nocy,',
  'dwóch tych samych pocałunków,',
  'dwóch jednakich spojrzeń w oczy.',
  'Wczoraj, kiedy twoje imię',
  'ktoś wymówił przy mnie głośno,',
  'tak mi byo, jakby róża',
  'przez otwarte wpadła okno.',
  'Dziś, kiedy jesteśmy razem,',
  'odwróciłam twarz ku ścianie.',
  'Róża ? Jak wygląda róża?',
  'Czy to kwiat ? A może kamień ?',
  'Czemu ty się, zła godzino,',
  'z niepotrzebnym mieszasz lękiem ?',
  'Jesteś - a więc musisz minąć.',
  'Miniesz - a więc to jest piękne.',
  'Uśmiechnięci, współobjęci',
  'spróbujemy szkać zgody,',
  'choć różnimy się od siebie',
  'jak dwie krople czystej wody.',
  ]
  return (
    <div>
      {testArrayOfWords.map(word => {
          return <Word word={word} key={Math.random()}/>
        })}
    </div>
  )
}
export default App;
