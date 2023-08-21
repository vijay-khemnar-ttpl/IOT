import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';
import httpClient from '../base';
import { useNotification } from '../../hooks/use-notification';
import { setAuthToken, setUserName } from '../../utils/authUtils';
import { useDataSourceForOrganizations } from '../../../src/service/Organizations';

export const useDataSources = () => {
    httpClient.accessToken = localStorage.getItem('access_token');
    const { notifyError, notifySuccess } = useNotification();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [busy, setBusy] = useState(false);

    const { get_Organizations } = useDataSourceForOrganizations();

    const resetPassword = async (email, otp, password) => {
        setBusy(true)
        const body = {
            email: email,
            otp: otp,
            password: password
        };
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/auth/reset-password/`, body);
            notifySuccess(response.data.message);
            return response.data;
        } catch (errors) {
            console.log('Error during verifying otp for passsword reset:', errors);
            notifyError(errors.response.data.errors ?? 'Unknown error while password reset');
        } finally {
            setBusy(false);
        }
    }

    const verifyEmailForResetPassword = async (email) => {
        setBusy(true)
        const body = {
            email: email,
        };
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/auth/forgot-password/`, body);
            return response.data;
        } catch (errors) {
            console.log('Error during password resetting:', errors);
            notifyError(errors.response.data.errors ?? 'Unknown error while password resetting');
        } finally {
            setBusy(false);
        }
    }

    const getLogin = async (email, password) => {
        setBusy(true)
        const body = {
            email: email,
            password: password,
        };
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/auth/login/`, body);
            setAuthToken(response.data.token.access, response.data.token.refresh);
            setUserName(email);
            console.log('response get org', response);
            const orgResponse = await get_Organizations();
            if (orgResponse.message === "No Organization found") {
                navigate('/create_organization');
            }
            else {
                navigate('/dashboard');
            }
            notifySuccess(response.data.message);
            return response.data;
        } catch (errors) {
            console.log('Error during login:', errors);
            if (errors.response.data.errors == "Your authentication information is incorrect. Please try again") {
                setError(true);
                setErrorMessage(errors.response.data.errors)
            }
            if (error || errors.response.data.errors == "User not found. Please register to create an account.") {
                notifyError(errors.response.data.errors ?? 'Unknown error while login');
                setError(false)
            }
        } finally {
            setBusy(false);
        }
    }

    const userRegister = async (firstname, lastname, email, password, server) => {
        setBusy(true)
        const body = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            server: server
        };
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/auth/register/`, body);
            // notifySuccess(response.data.message);
            return response;
        } catch (errors) {
            notifyError(errors.response.data.errors ?? 'Unknown error while register');
        } finally {
            setBusy(false);
        }
    }

    const verifyUser = async (email, otp) => {
        setBusy(true)
        const body = {
            email: email,
            otp: otp
        };
        try {
            const response = await axios.post(`${BACKEND_BASE_URL}/auth/verify-otp/`, body);
            console.log(response);
            notifySuccess(response.data.message);
            return response;
        } catch (errors) {
            console.log('Error during verifying:', errors);
            notifyError(errors.response.data.error ?? 'Unknown error while verifying');
        } finally {
            setBusy(false);
        }
    }

    const getUserDetails = async () => {
        // try {
        //     const response = await axios.get(`${BACKEND_BASE_URL}/auth/profile/`);
        //     console.log(response);
        //     return response;
        // } catch (errors) {
        //     console.log('Error during getting user details:', errors);
        //     notifyError(errors.response.data.error ?? 'Unknown error while getting user details');
        // }
        return httpClient.get(`${BACKEND_BASE_URL}/auth/profile/`);

    }

    return {
        busy,
        error,
        errorMessage,
        resetPassword,
        verifyEmailForResetPassword,
        getLogin,
        userRegister,
        verifyUser,
        getUserDetails
    }

}