import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth.signInWithPopup(provider)
    .then(result => {
      console.log(result);
      dispatch({
        type: actionTypes.SET_USER,
        user: result.user,
      });
    })
    .catch(err => {
      alert(err.message);
    });
  }

  return (
    <div className="login">

      <div className="login__container">
        <img src="/android-icon-192x192.png" alt="ReactChat App" />
        <div className="login__text"><h1>Sign In to ReactChat App</h1></div>
        <Button onClick={ signIn } >Sign In With Google</Button>
      </div>

    </div>
  );
}

export default Login;
