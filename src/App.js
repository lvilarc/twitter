// import logo from './logo.svg';
import './App.css';
import Access from './components/Access/Access';
import SearchBar from './components/SearchBar/SearchBar';
import TweetHome from './components/TweetHome/TweetHome';
import fotoPerfil from './foto-perfil.png';
import { FaTwitter, FaSearch, FaUserFriends } from 'react-icons/fa';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='div-esquerda'>
          <ul className="botao-lista">
            <li>
              <button className="botao-twitter">
                <FaTwitter/>
              </button>
            </li>
            <li>
              <button className="botao-explorar">
              <FaSearch className='tres-icones'/>
              Explorar
              </button>
            </li>
            <li>
              <button className="botao-seguindo">
                <FaUserFriends className='tres-icones'/>
                Seguindo
              </button>
            </li>
          </ul>
        </div>
        <div className="div-central">
          <SearchBar />
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
            text={'Aqui é só um texto bem grande para ver como fica mais ou menos com limite de 200 caracteris qe eua g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh g aofafjwfoiwajnfio awfuoawh jnfiuawhnfiu awfiunh ioauwf nhbv9iuawhn fiu awhfiuhwanbiufhawiu'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />
          <TweetHome
            imageSrc={fotoPerfil}
            name={'Lucas Vilar'}
            username={'@geraldo'}
            text={'Só um texto de twitter'} />



        </div>
        <Access></Access>
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
