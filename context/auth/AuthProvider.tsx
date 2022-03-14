import { FC, useReducer, useEffect } from "react";
import { AuthContext, authReducer } from "./";
import { IUser } from "../../interfaces/";
import { koonApi } from "../../api";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react";


export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);

  const {data,status} = useSession()

  console.log({data,status})

  const router = useRouter()
  
  useEffect(() => {
    if(status === 'authenticated'){
      console.log({user: data?.user})
      dispatch({type:"[Auth] - Login",payload:data?.user as IUser})
    }

  }, [status,data])
  

  const checkToken = async () => {
    // const tokenInCookies = Cookies.get('token')

    if(!Cookies.get('token')){
      return
    }

    try {
      const { data } = await koonApi.get("/user/validate-token");
      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });
    } catch (error) {
      Cookies.remove('token')
    }
  };

  const logginUser = async (
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const { data } = await koonApi.post("/user/login", { email, password });

      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ hasError: boolean; message?: string }> => {
    try {
      const { data } = await koonApi.post("/user/register", {
        name,
        email,
        password,
      });

      const { token, user } = data;

      Cookies.set("token", token);

      dispatch({ type: "[Auth] - Login", payload: user });

      return {
        hasError: false,
      };

      //TODO: RETURN
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }
      return {
        hasError: true,
        message: "No se pudo crear el usuario, intente de nuevo.",
      };
    }
  };


  const logout = () => {
    Cookies.remove('cart');
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("address");
    Cookies.remove("address2");
    Cookies.remove("zipCode");
    Cookies.remove("city");
    Cookies.remove("country");
    Cookies.remove("phone");
    signOut();
    
    

  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
