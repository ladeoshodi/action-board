interface LoginProps {
  setShowLogin: (showLogin: boolean) => void;
}

function Login({ setShowLogin }: LoginProps) {
  return <p>Login Form</p>;
}

export default Login;
