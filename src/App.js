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
import baseURL from './service/baseURL';
import UserPerfil from './components/UserPerfil/UserPerfil';



function App() {

  const [usuarioPerfil, setUsuarioPerfil] = useState(null);
  const [isLoggeedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState(null);
  const [showMyPerfil, setShowMyPerfil] = useState(false);
  const [showUserPerfil, setShowUserPerfil] = useState(false);
  const [title, setTitle] = useState('Explorar');
  const [showAccess, setShowAccess] = useState(false);




  const getUser = async (id) => {
    try {
      // console.log(id)
      const response = await api.get(`/users/${id}`);

      // console.log('disso aqui')
      // console.log(response.data.user)

      setUsuarioPerfil(response.data.user);


      //   , () => {
      //   console.log('atualizou')
      //   console.log(usuarioPerfil)
      //   setShowUserPerfil(true);
      // });
      // setTitle(response.data.user.name)
      // setTimeout(()=> {
      //   console.log('usuario perfil: ')
      //   console.log(usuarioPerfil)
      //   setShowUserPerfil(true);
      // }  , 4000      )





    } catch (error) {




    }
  }

  useEffect(() => {
    if (usuarioPerfil !== null) {
      // console.log('do useeffetc')
      // console.log(usuarioPerfil)
      // setTimeout(()=> {
      //   setShowUserPerfil(true);
      // }, 1000)
      setShowUserPerfil(true);
      setShowMyPerfil(false)
      indexTweetsUser(usuarioPerfil.id)
      console.log('entrou aqui')
    }
  }, [usuarioPerfil]);






  const changePageToUserPerfil = () => {
    // console.log("ssio aqui ta entr")
    setShowMyPerfil(false)
    indexTweets();
    // indexTweetsUser();

    // setShowUserPerfil(true);
    // console.log(userPerfil)
    // setTitle(userPerfil.name)



  }

  // useEffect(() => {
  //   console.log(userPerfil)
  // }, [userPerfil])


  const getDetails = async (token) => {
    try {
      const response = await api.get('/auth/getDetails', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // console.log(response.data.user)
      setUser(response.data.user);
      setIsLoggedIn(true);


    } catch (error) {

      setIsLoggedIn(false);
      setShowAccess(true);


    }
  }


  const checkSession = () => {
    // Verificar se há um token armazenado no Local Storage
    const token = localStorage.getItem('token');

    if (token) {
      getDetails(token);



      // Verificar se o token é válido (por exemplo, verificando sua expiração)


      // Se o token for válido, você pode atualizar o estado do aplicativo para indicar que o usuário está logado
      // Por exemplo: dispatch(setUserLoggedIn(true));

      // Caso contrário, você pode chamar a função de logout para limpar o token do Local Storage
      // logout();
    } else {
      setIsLoggedIn(false)
      setShowAccess(true);
      // O token não está presente no Local Storage ou não é válido
      // Você pode atualizar o estado do aplicativo para indicar que o usuário não está logado
      // Por exemplo: dispatch(setUserLoggedIn(false));
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  useEffect(() => {
    checkSession();
  }, [title]);



  const indexTweetsUser = async (id) => {
    try {
      console.log('quantas vezes entrou aqaui')
      if (id == null) {
        // console.log(user.id)
        // console.log('E AQUI TAMBEM TA DEPOIS')
        const response = await api.get(`/tweet/user/${user.id}`);
        // console.log('response' + response)
        setTweets([...response.data.tweets].reverse());
        // console.log(response.data.tweets)
      } else {
        // console.log('ENTROU AQUI OU NAO')
        const response = await api.get(`/tweet/user/${id}`);
        // console.log('response' + response)
        setTweets([...response.data.tweets].reverse());
      }


    } catch (error) {

    }
  };

  useEffect(() => {




    if (showMyPerfil == true) {
      indexTweetsUser();
    } else {
      indexTweets()
    }
   






  }, [showMyPerfil]);


  const indexTweets = async () => {
    try {
      console.log('QUANTAS VEZES ENTRA AQUI?')
      const response = await api.get('/tweets');
      setTweets([...response.data.tweets].reverse());
      // console.log(response.data.tweets)

    } catch (error) {

    }
  };

  useEffect(() => {





    indexTweets();





    // console.log(user)
  }, []);

  useEffect(() => {
    if (title === 'Explorar') {
      indexTweets();
    }

  }, [title])


  const handleExplorar = () => {
    indexTweets();
    setTitle('Explorar');
    setShowMyPerfil(false);
    setShowUserPerfil(false);
    

  }

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
              <button className="botao-explorar" onClick={handleExplorar}>
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
              imageSrc={`${baseURL}/uploads/${user.photo}`}
              name={user.name}
              username={`@${user.username}`}
              user={user}
              checkSession={checkSession}
              indexTweetsUser={indexTweetsUser}
            ></Perfil>
          )}

          {showUserPerfil && (
            <div key={usuarioPerfil.id}>
              <UserPerfil
                photo={usuarioPerfil.photo}
                name={usuarioPerfil.name}
                username={usuarioPerfil.username}
              />
            </div>
          )}

          {/*         
            <UserPerfil
              user={user}
            ></UserPerfil>
         */}



          {tweets !== null && (
            <div>
              {tweets.reverse().map(tweet => (
                <div key={tweet.id}>
                  <TweetHome
                    imageSrc={`${baseURL}/uploads/${tweet.User.photo}`}
                    name={tweet.User.name}
                    text={tweet.text}
                    username={`@${tweet.User.username}`}
                    imageSrcTweet={tweet.tweetPhoto ? `${baseURL}/uploads/${tweet.tweetPhoto}` : ''}
                    timeElapsed={tweet.timeElapsed}
                    // setUserPerfil={setUserPerfil}
                    id={tweet.User.id}
                    changePageToUserPerfil={changePageToUserPerfil}
                    getUser={getUser}
                    setShowMyPerfil={setShowMyPerfil}
                    user={user}
                    indexTweets={indexTweets}
                  />
                </div>
              ))}
            </div>
          )}




        </div>
        <Access
          user={user}
          setUser={setUser}
          isLoggeedIn={isLoggeedIn}
          setIsLoggedIn={setIsLoggedIn}
          isLoginModalOpen={isLoginModalOpen}
          setIsLoginModalOpen={setIsLoginModalOpen}
          setShowMyPerfil={setShowMyPerfil}
          setShowUserPerfil={setShowUserPerfil}
          setTitle={setTitle}
          showAccess={showAccess}
          setShowAccess={setShowAccess}>

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
