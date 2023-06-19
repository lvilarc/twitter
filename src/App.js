// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/SearchBar/SearchBar';
import TweetHome from './components/TweetHome/TweetHome';
import fotoPerfil from './foto-perfil.png';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div className="div-central">
        <SearchBar/>
        <TweetHome
        imageSrc={fotoPerfil}
        name={'Lucas Vilar'}
        text={'Só um texto de twitter'}
        username={'@geraldo'}
        />
        
        <TweetHome
        imageSrc={fotoPerfil}
        name={'Eduarda Leal'}
        username={'@geraldo'}
        text={'Aqui é só um texto bem grande para ver como fica mais ou menos com limite de 200 caracteris qe eua g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh jnfiuawhnfiu awfiunh ioauwf nhbv9iuawhn fiu awhfiuhwanbiufhawiu'}/>
        <TweetHome
        imageSrc={fotoPerfil}
        name={'Lucas Vilar'}
        username={'@geraldo'}
        text={'Só um texto de twitter'}/>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
