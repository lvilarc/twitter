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
      const user = response.data.user;



      // Verificar se a propriedade "photo" está presente e é do tipo Buffer
      if (user.photo && user.photo.type === 'Buffer') {
        // Converter o array de bytes em ArrayBuffer
        const arrayBuffer = Uint8Array.from(user.photo.data).buffer;

        // Criar uma Blob a partir do ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

        // Criar uma URL temporária para o Blob
        const url = URL.createObjectURL(blob);

        // Atualizar a propriedade "photo" do usuário com a URL
        user.photo = url;
      }
      // console.log('esse e o usuario perfil')
      // console.log(user)

      setUsuarioPerfil(user);
      // setShowUserPerfil(true)

      //   , () => {
      //   console.log('atualizou')
      //   console.log(usuarioPerfil)
      //   setShowUserPerfil(true);
      // });
      // console.log("response id: " + response.data.user.id)
      // console.log("user id: " + user.id)
      // console.log(user)
      // if (response.data.user.id = user.id) {
      //   setTitle("Meu perfil");
      // } else {
      //   setTitle(response.data.user.name)
      // }
      setTitle(response.data.user.name);

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
      if (showMyPerfil == true) {
        indexTweetsUser();
      } else if (showUserPerfil == true) {
        indexTweetsUser(usuarioPerfil.id)
      } else {
        indexTweets()
      }
      // console.log('entrou aqui')
    }
  }, [usuarioPerfil]);






  const changePageToUserPerfil = () => {

    // console.log("ssio aqui ta entr")
    setShowMyPerfil(false)
    if (showMyPerfil == true) {
      indexTweetsUser();
    } else if (showUserPerfil == true) {
      indexTweetsUser(usuarioPerfil.id)
    } else {
      indexTweets()
    }
    // console.log('sim entra aqui sim')
    setShowUserPerfil(true);
    // indexTweetsUser();

    // setShowUserPerfil(true);
    // console.log(userPerfil)
    // setTitle(usuarioPerfil.name)



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
      const user = response.data.user;



      // Verificar se a propriedade "photo" está presente e é do tipo Buffer
      if (user.photo && user.photo.type === 'Buffer') {
        // Converter o array de bytes em ArrayBuffer
        const arrayBuffer = Uint8Array.from(user.photo.data).buffer;

        // Criar uma Blob a partir do ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

        // Criar uma URL temporária para o Blob
        const url = URL.createObjectURL(blob);

        // Atualizar a propriedade "photo" do usuário com a URL
        user.photo = url;
      }
      // console.log(user)

      // Verificar se a propriedade "photo" está presente e é do tipo Blob
      // if (user.photo instanceof Blob) {
      // Criar uma URL temporária para o objeto Blob
      // const url = URL.createObjectURL(user.photo);

      // // Atualizar a propriedade "photo" do usuário com a URL
      // user.photo = url;
      // console.log(user)
      // }
      console.log(user)
      setUser(user);





      // console.log(response.data.user)
      // setUser(response.data.user);
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
      console.log('INDEX TWEET USER')
      if (id == null) {
        // console.log(user.id)
        // console.log('E AQUI TAMBEM TA DEPOIS')
        const response = await api.get(`/tweet/user/${user.id}`);
        // console.log('response' + response)
        const tweets = response.data.tweets;


        // Percorrer os tweets e converter as fotos dos usuários
        const updatedTweets = tweets.map(tweet => {
          const user = tweet.User;

          // Verificar se a propriedade "photo" está presente e é do tipo Buffer
          if (user.photo && user.photo.type === 'Buffer') {
            // Converter o array de bytes em ArrayBuffer
            const arrayBuffer = Uint8Array.from(user.photo.data).buffer;

            // Criar uma Blob a partir do ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            // Criar uma URL temporária para o Blob
            const url = URL.createObjectURL(blob);

            // Atualizar a propriedade "photo" do usuário com a URL
            user.photo = url;
          }

          if (tweet.tweetPhoto && tweet.tweetPhoto.type === 'Buffer') {
            // Converter o array de bytes em ArrayBuffer
            const arrayBuffer = Uint8Array.from(tweet.tweetPhoto.data).buffer;

            // Criar uma Blob a partir do ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            // Criar uma URL temporária para o Blob
            const url = URL.createObjectURL(blob);

            // Atualizar a propriedade "photo" do usuário com a URL
            tweet.tweetPhoto = url;
          }


          // Retornar o tweet atualizado
          return tweet;
        });

        // Atualizar o estado "tweets" com os tweets atualizados e revertê-los
        const reversedTweets = updatedTweets.reverse();
        setTimeout(() => {
          setTweets(reversedTweets);
        }, 100);
        // console.log(response.data.tweets)
      } else {
        // console.log('ENTROU AQUI OU NAO')
        const response = await api.get(`/tweet/user/${id}`);
        // console.log('response' + response)
        const tweets = response.data.tweets;


        // Percorrer os tweets e converter as fotos dos usuários
        const updatedTweets = tweets.map(tweet => {
          const user = tweet.User;

          // Verificar se a propriedade "photo" está presente e é do tipo Buffer
          if (user.photo && user.photo.type === 'Buffer') {
            // Converter o array de bytes em ArrayBuffer
            const arrayBuffer = Uint8Array.from(user.photo.data).buffer;

            // Criar uma Blob a partir do ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            // Criar uma URL temporária para o Blob
            const url = URL.createObjectURL(blob);

            // Atualizar a propriedade "photo" do usuário com a URL
            user.photo = url;
          }

          if (tweet.tweetPhoto && tweet.tweetPhoto.type === 'Buffer') {
            // Converter o array de bytes em ArrayBuffer
            const arrayBuffer = Uint8Array.from(tweet.tweetPhoto.data).buffer;

            // Criar uma Blob a partir do ArrayBuffer
            const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

            // Criar uma URL temporária para o Blob
            const url = URL.createObjectURL(blob);

            // Atualizar a propriedade "photo" do usuário com a URL
            tweet.tweetPhoto = url;
          }

          // Retornar o tweet atualizado
          return tweet;
        });

        // Atualizar o estado "tweets" com os tweets atualizados e revertê-los
        const reversedTweets = updatedTweets.reverse();
        
        setTimeout(() => {
          setTweets(reversedTweets);
        }, 100);
      }


    } catch (error) {

    }
  };

  //   useEffect(() => {




  // //     if (showMyPerfil == true) {
  // //       indexTweetsUser();
  // //     } else if (showUserPerfil == true) {
  // //       indexTweetsUser(usuarioPerfil.id)
  // //     } else {
  // //       indexTweets()
  // //     }





  // // console.log('entra aqui sim')

  //   }, [showMyPerfil]);


  const indexTweets = async () => {
    try {
      console.log('INDEX TWEETS')
      const response = await api.get('/tweets');
      const tweets = response.data.tweets;


      // Percorrer os tweets e converter as fotos dos usuários
      const updatedTweets = tweets.map(tweet => {
        const user = tweet.User;

        // Verificar se a propriedade "photo" está presente e é do tipo Buffer
        if (user.photo && user.photo.type === 'Buffer') {
          // Converter o array de bytes em ArrayBuffer
          const arrayBuffer = Uint8Array.from(user.photo.data).buffer;

          // Criar uma Blob a partir do ArrayBuffer
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

          // Criar uma URL temporária para o Blob
          const url = URL.createObjectURL(blob);

          // Atualizar a propriedade "photo" do usuário com a URL
          user.photo = url;
        }


        if (tweet.tweetPhoto && tweet.tweetPhoto.type === 'Buffer') {
          // Converter o array de bytes em ArrayBuffer
          const arrayBuffer = Uint8Array.from(tweet.tweetPhoto.data).buffer;

          // Criar uma Blob a partir do ArrayBuffer
          const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });

          // Criar uma URL temporária para o Blob
          const url = URL.createObjectURL(blob);

          // Atualizar a propriedade "photo" do usuário com a URL
          tweet.tweetPhoto = url;
        }

        // Retornar o tweet atualizado
        return tweet;
      });

      // Atualizar o estado "tweets" com os tweets atualizados e revertê-los
      const reversedTweets = updatedTweets.reverse();
      setTimeout(() => {
        setTweets(reversedTweets);
      }, 100);

    } catch (error) {

    }
  };

  useEffect(() => {





    if (showMyPerfil == true) {
      indexTweetsUser();
    } else if (showUserPerfil == true) {
      indexTweetsUser(usuarioPerfil.id)
    } else {
      indexTweets()
    }





    // console.log(user)
  }, []);

  useEffect(() => {
    if (showMyPerfil == true) {
      indexTweetsUser();
    } else if (showUserPerfil == true) {
      indexTweetsUser(usuarioPerfil.id)
    } else {
      indexTweets()
    }

  }, [title])


  const handleExplorar = () => {
    if (showMyPerfil == true) {
      indexTweetsUser();
    } else if (showUserPerfil == true) {
      indexTweetsUser(usuarioPerfil.id)
    } else {
      indexTweets()
    }
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
            {/* <li>
              <button className="botao-seguindo">
                <FaUserFriends className='tres-icones' />
                Seguindo
              </button>
            </li> */}
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
            <div>
              <Perfil
                imageSrc={user.photo ? user.photo : fotoPerfil}
                name={user.name}
                username={`@${user.username}`}
                user={user}
                checkSession={checkSession}
                indexTweetsUser={indexTweetsUser}
              ></Perfil>
            </div>
          )}

          {usuarioPerfil !== null && showUserPerfil && (
            <div key={usuarioPerfil.id}>
              <UserPerfil
                photo={usuarioPerfil.photo ? usuarioPerfil.photo : fotoPerfil}
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
                    imageSrc={tweet.User.photo ? tweet.User.photo : fotoPerfil}
                    name={tweet.User.name}
                    text={tweet.text}
                    username={`@${tweet.User.username}`}
                    imageSrcTweet={tweet.tweetPhoto ? tweet.tweetPhoto : ''}
                    timeElapsed={tweet.timeElapsed}
                    // setUserPerfil={setUserPerfil}
                    id={tweet.User.id}
                    changePageToUserPerfil={changePageToUserPerfil}
                    getUser={getUser}
                    setShowMyPerfil={setShowMyPerfil}
                    user={user}
                    indexTweets={indexTweets}
                    setTitle={setTitle}
                    setShowUserPerfil={setShowUserPerfil}
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
