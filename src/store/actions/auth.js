import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC71y7alXjKY9JuFIf0AYlDKH8YYUbIpHw';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC71y7alXjKY9JuFIf0AYlDKH8YYUbIpHw';
        }

        axios.post(url, {
            email,
            password,
            returnSecureToken: true
        })
            .then(response => {
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    };
};