import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';
import httpClient from '../base';
import { useNotification } from '../../hooks/use-notification';

export const useDataSourceForOrganizations = () => {
    const { notifyError, notifySuccess } = useNotification();
    const navigate = useNavigate();

    const create_Organization = async (orgName) => {
        httpClient.accessToken = localStorage.getItem('access_token');
        const body = {
            organization_name: orgName,
        };
        // try {
        //     const response = await axios.post(`${BACKEND_BASE_URL}/org/organizations/`, body);
        //     console.log(response);
        //     notifySuccess(response.data.message);
        //     return response;
        // } catch (errors) {
        //     console.log('Error during creating organization:', errors);
        //     notifyError(errors.response.data.error ?? 'Unknown error while creating organization');
        // } finally {
        //     setBusy(false);
        // }
        return httpClient.post(`${BACKEND_BASE_URL}/org/organizations/`, body);
    }

    const get_Organizations = async () => {
        httpClient.accessToken = localStorage.getItem('access_token');
        // try {
        //     const response = await axios.get(`${BACKEND_BASE_URL}/org/organizations/`, body);
        //     console.log(response);
        //     notifySuccess(response.data.message);
        //     return response;
        // } catch (errors) {
        //     console.log('Error during getting organization:', errors);
        //     notifyError(errors.response.data.error ?? 'Unknown error while getting organization');
        // } finally {
        //     setBusy(false);
        // }
        return httpClient.get(`${BACKEND_BASE_URL}/org/organizations/`);
    }

    return {
        create_Organization,
        get_Organizations,
    }

}