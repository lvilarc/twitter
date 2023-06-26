// import logo from './logo.svg';
import './App.css';
import Access from './components/Access/Access';
import Perfil from './components/Perfil/Perfil';
import SearchBar from './components/SearchBar/SearchBar';
import TweetHome from './components/TweetHome/TweetHome';
import fotoPerfil from './foto-perfil.png';
import api from './service/api'
import { useState, useEffect } from 'react';
import { FaTwitter, FaSearch, FaUserFriends } from 'react-icons/fa';


function App() {

  const [isLoggeedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [showMyPerfil, setShowMyPerfil] = useState(false);
  const [title, setTitle] = useState('Explorar');



  useEffect(() => {
    const indexTweetsUser = async () => {
      try {
        console.log(user.id)
        const response = await api.get(`/tweet/user/${user.id}`);
        console.log('response' + response)
        setTweets([...response.data.tweets].reverse());
        console.log(response.data.tweets)

      } catch (error) {

      }
    };

    

  
      indexTweetsUser();
 
    
    

    
    
  }, [showMyPerfil]);

  useEffect(() => {
    const indexTweets = async () => {
      try {
        const response = await api.get('/tweets');
        setTweets([...response.data.tweets].reverse());
        console.log(response.data.tweets)

      } catch (error) {

      }
    };

    

  
      indexTweets();
 
    
    

    
    console.log(user)
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
            title={title}
            user={user}
            isLoggeedIn={isLoggeedIn}
            setIsLoginModalOpen={setIsLoginModalOpen}
          />

          {user !== null && showMyPerfil && (
            <Perfil
            imageSrc={`http://192.168.0.13:3333/uploads/${user.photo}`}
            name={user.name}
            username={`@${user.username}`}
            ></Perfil>
          )}
      

      
          {tweets !== null && tweets.reverse().map(tweet => (
            <TweetHome
              key={tweet.id}
              imageSrc={`http://192.168.0.13:3333/uploads/${tweet.User.photo}`}
              name={tweet.User.name}
              text={tweet.text}
              username={`@${tweet.User.username}`}
              imageSrcTweet={tweet.tweetPhoto ? `http://192.168.0.13:3333/uploads/${tweet.tweetPhoto}` : ''}
              timeElapsed={tweet.timeElapsed}
            />
          ))}




        </div>
        <Access
          user={user}
          setUser={setUser}
          isLoggeedIn={isLoggeedIn}
          setIsLoggedIn={setIsLoggedIn}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setShowMyPerfil={setShowMyPerfil}
          setTitle={setTitle}>
            
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
