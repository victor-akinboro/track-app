import createDataContext from "./createDataContext";
import TrackerApi from '../api/TrackerApi'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigarionRef";

const authReducer = (state, action) => {
  switch(action.type){
    case 'ADD_ERROR':
      return {...state, errorMessage: action.payload}
    case 'SIGN_UP': 
      return {...state, errorMessage: '', token: action.payload};
    case 'SIGN_IN':
      return {...state, errorMessage: '', token: action.payload};
    case 'SIGN_OUT':
      return {...state, token: null, errorMessage: ''};
    case 'CLEAR_ERROR_MESSAGE':
      return {...state, errorMessage: ''};
    default: 
      return state;
  }
};

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if(token){
    dispatch({type: 'SIGN_IN', payload: token});
    navigate('TrackList')
  }else{
    navigate('loginFlow')
  }
}

const signIn = dispatch => async ({email, password}) => {
  try{
    const response = await TrackerApi.post('/signin', {email, password});
    AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'SIGN_IN', payload: response.data.token})
    navigate('TrackList')
  }catch(err){
    dispatch({type: 'ADD_ERROR', payload: 'Something went wrong with sign in'})
  }
};

const signUp = dispatch => async ({email, password}) => {
  try {
    const response = await TrackerApi.post('/signup', {email, password});
    AsyncStorage.setItem('token', response.data.token);
    dispatch({type: 'SIGN_UP', payload: response.data.token});
    navigate('TrackList')
  } catch(err){
    dispatch({type: 'ADD_ERROR', payload: 'Something went wrong with sign up'})
  }
}

const clearErrorMessage = dispatch => {
  return ()=> {
    dispatch({
      type: 'CLEAR_ERROR_MESSAGE'
    })
  }
}

const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({type: 'SIGN_OUT'});
  navigate('SignIn');
}

export const { Context, Provider } = createDataContext(
  authReducer,
  {signUp, signIn, signOut, clearErrorMessage, tryLocalSignIn},
  {token: null, errorMessage: ''}
)