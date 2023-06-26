// import logo from './logo.svg';
import './App.css';
import Access from './components/Access/Access';
import SearchBar from './components/SearchBar/SearchBar';
import TweetHome from './components/TweetHome/TweetHome';
import fotoPerfil from './foto-perfil.png';
import api from './service/api'
import { useState, useEffect } from 'react';
import { FaTwitter, FaSearch, FaUserFriends } from 'react-icons/fa';

function App() {

  const [isLoggeedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState();
  const [tweets, setTweets] = useState(null);



  

  useEffect(() => {
    const indexTweets = async () => {
      try {
        const response = await api.get('/tweets');
        setTweets(response.data.tweets);
        console.log(response.data.tweets[0].User)
  
  
  
      } catch (error) {
  
  
  
  
      }
    };

    indexTweets();
  }, []);

  return (
    <div className="App">
      <div className='container'>
        <div className='div-esquerda'>
          <ul className="botao-lista">
            <li>
              <button className="botao-twitter">
                <FaTwitter />
              </button>
            </li>
            <li>
              <button className="botao-explorar">
                <FaSearch className='tres-icones' />
                Explorar
              </button>
            </li>
            <li>
              <button className="botao-seguindo">
                <FaUserFriends className='tres-icones' />
                Seguindo
              </button>
            </li>
          </ul>
        </div>
        <div className="div-central">
          <SearchBar
            user={user}
            isLoggeedIn={isLoggeedIn}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />


          {tweets !== null && tweets.map(tweet => (
            <TweetHome
              key={tweet.id}
              imageSrc={`http://192.168.0.100:3333/uploads/${tweet.User.photo}`}
              name={tweet.User.name}
              text={tweet.text}
              username={`@${tweet.User.username}`}
            />
          ))}
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
        <Access
          user={user}
          setUser={setUser}
          isLoggeedIn={isLoggeedIn}
          setIsLoggedIn={setIsLoggedIn}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}>
        </Access>
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
