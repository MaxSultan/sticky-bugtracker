import React, { Component } from 'react'
import axios from 'axios'

export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer

export default class AuthProvider extends Component {
    state = {
        user: null,
    }

    handleRegister = (user, history) => {
        axios.post("/api/auth", user)
          .then( res => {
            this.setState({ user: res.data.data, });
            history.push("/");
          })
        .catch(err => {
          alert(err);
        })
      }
      
      handleLogin = (user, history) => {
        axios.post("/api/auth/sign_in", user)
          .then( res => {
            this.setState({ user: res.data.data, });
            history.push("/");
          })
          .catch(err => {
            alert("Incorrect Email or Password. Please try again");
          })
      }
      
      handleLogout = (history) => {
        axios.delete("/api/auth/sign_out")
          .then( res => {
            this.setState({ user: null, });
            history.push('/login');
          })
          .catch(err => {
            alert(err);
          })
      }

      handleProfileEdit = (user) => {
        axios.put("/api/auth", user)
        .then( res => {
          this.setState({ user: res.data.data, });
        })
        .catch( res => {
          console.log(res);
        })
      }
      
    render() {
        return (
           <AuthContext.Provider 
           value={{
            user: this.state.user,
            authenticated: this.state.user !== null,
            handleRegister: this.handleRegister,
            handleLogin: this.handleLogin,
            handleLogout: this.handleLogout,
            handleProfileEdit: this.handleProfileEdit,
            setUser: (user) => this.setState({ user, }) 
           }}>
               {this.props.children}
           </AuthContext.Provider>
        )
    }
}
