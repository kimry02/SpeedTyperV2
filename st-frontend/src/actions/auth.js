import * as api from '../api/index.js';

export const signin = (formData, nav) => async (dispatch) => {
    try {
        const { data } = await api.signInUser(formData.username, formData.password);
        dispatch({ type: 'Auth', data })
        nav('/');
    } catch (error) {
        console.log(error);
    }
};

export const signup = (formData, nav) => async (dispatch) => {
    try {
        const { data } = await api.signUpUser(formData.username, formData.password);
        dispatch({ type: 'Auth', data })
        nav('/');
    } catch (error) {
        console.log(error);
    }
};

export const update = (username, wpm, newRC, nav) => async (dispatch) => {
    try {
        await api.updateUser(username, wpm, newRC)
        const { data } = await api.getUser(username);
        dispatch({ type: 'Auth', data })
        nav('/');
    } catch (error) {
        console.log(error);
    }
}