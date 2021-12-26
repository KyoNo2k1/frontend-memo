import { AUTH } from '../constants/actionType'
import * as api from '../api'

export const signin = (formData,navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)
        console.log(data);

        const action = {
            type: AUTH,
            data
        }

        dispatch(action)

        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signup = (formData,navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)

        const action = {
            type: AUTH,
            data
        }

        dispatch(action)

        navigate('/')
    } catch (error) {
        console.log(error);
    }
}