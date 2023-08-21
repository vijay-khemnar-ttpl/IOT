import Axios from 'axios';

class HttpClient {
    static instance = null;

    static getInstance() {
        if (!HttpClient.instance) {
            HttpClient.instance = new HttpClient();
        }

        return HttpClient.instance;
    }

    accessToken = '';

    refreshToken = '';

    _authHandler = null;

    _dispatch = null;

    init = (authHandler, dispatch) => {
        this._authHandler = authHandler;
        this._dispatch = dispatch;
        Axios.interceptors.response.use(undefined, this.refreshHandler);
        Axios.defaults.withCredentials = true; // important for POST request
        Axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
        Axios.defaults.xsrfCookieName = 'csrftoken';
    };

    // prepareHeader = (headers = {}, token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDc2NjQ0LCJpYXQiOjE2OTEwNzYzNDQsImp0aSI6ImQwZTZlOTYzMTc5NzQ1OThiZDNhZDlhMmQxODkwNDhjIiwidXNlcl9pZCI6Mn0.Lj6-ShTFfp3m7fRAGSSlKgtOJY9BctnGp9J-ooSw9p0') => {
    //     return { ...headers, Authorization: `Bearer ${token ? token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkxMDc2NjQ0LCJpYXQiOjE2OTEwNzYzNDQsImp0aSI6ImQwZTZlOTYzMTc5NzQ1OThiZDNhZDlhMmQxODkwNDhjIiwidXNlcl9pZCI6Mn0.Lj6-ShTFfp3m7fRAGSSlKgtOJY9BctnGp9J-ooSw9p0'}` };
    // };

    prepareHeader = (headers = {}, token = null) => {
        return { ...headers, Authorization: `Bearer ${this.accessToken}` };
    };

    get = async (url, params = {}, headers = {}) => {
        const { data } = await Axios.get(url, { params, headers: this.prepareHeader(headers) });
        return data;
    };

    post = async (url, body, params = {}, headers = {}) => {
        const { data } = await Axios.post(url, body, { params, headers: this.prepareHeader(headers) });
        return data;
    };

    put = async (url, body, params = {}, headers = {}) => {
        const { data } = await Axios.put(url, body, { params, headers: this.prepareHeader(headers) });
        return data;
    };

    delete = async (url, params = {}, headers = {}) => {
        const { data } = await Axios.delete(url, { params, headers: this.prepareHeader(headers) });
        return data;
    };

}

export default HttpClient.getInstance();
