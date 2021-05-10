import { useEffect, useState } from "react";
import "./App.css";
import firebase from "./config/firebase-config";
import { googleProvider } from "./config/authMethod";
import socialMediaAuth from "./service/auth";

function App() {
  const [name, setNme] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [islogged, setIslogged] = useState(false);

  const Login = async (provider) => {
    const res = await socialMediaAuth(provider);
    console.log(res);
  };

  const Logout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        setIslogged(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user.displayName);
        setIslogged(true);
        setNme(user.displayName);
        setEmail(user.email);
        setPhotoURL(user.photoURL);
      }
    });
  }, []);

  return (
    <>
      <h1>test</h1>
      {islogged === false ? (
        <button onClick={() => Login(googleProvider)}>GOOGLE</button>
      ) : (
        <>
          <h1>
            <img src={photoURL} alt=""></img>
            {name} {email}
          </h1>
          <button onClick={() => Logout(googleProvider)}>LOGOUT</button>
        </>
      )}
    </>
  );
}

export default App;
