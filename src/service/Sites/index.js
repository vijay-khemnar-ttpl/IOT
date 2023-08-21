// import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';
import httpClient from '../base';

export const useDataSourceForSites = () => {

  const create_Site = async (site_name, address, zipcode, state, country) => {
    httpClient.accessToken = localStorage.getItem('access_token');
    const body = {
      site_name: site_name,
      address: address,
      zipcode: zipcode,
      state: state,
      country: country
    };
    // try {
    //     const response = await axios.post(`${BACKEND_BASE_URL}/org/sites/`, body);
    //     console.log(response);
    //     notifySuccess(response.data.message);
    //     return response;
    // } catch (errors) {
    //     console.log('Error during creating organization:', errors);
    //     notifyError(errors.response.data.error ?? 'Unknown error while creating organization');
    // } finally {
    //     setBusy(false);
    // }
    return httpClient.post(`${BACKEND_BASE_URL}/org/sites/`, body);
  }

  // const get_Site = async () => {
  //   setBusy(true);
  //   // try {
  //   //     const response = await axios.get(`${BACKEND_BASE_URL}/org/sites/`, body);
  //   //     console.log(response);
  //   //     notifySuccess(response.data.message);
  //   //     return response;
  //   // } catch (errors) {
  //   //     console.log('Error during getting organization:', errors);
  //   //     notifyError(errors.response.data.error ?? 'Unknown error while getting organization');
  //   // } finally {
  //   //     setBusy(false);
  //   // }
  //   return httpClient.get(`${BACKEND_BASE_URL}/org/sites/`);
  // }

  return {
    create_Site,
  }

}