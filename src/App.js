import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { salesforceConfig, salesforceConfigRefresh } from './config';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    if (token) {
      setAccessToken(token);
    }
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }
  }, []);

  const authUrl = `https://login.salesforce.com/services/oauth2/authorize?client_id=${salesforceConfigRefresh.clientId}&redirect_uri=${encodeURIComponent(salesforceConfigRefresh.redirectUri)}&response_type=${salesforceConfigRefresh.responseType}&scope=${encodeURIComponent(salesforceConfigRefresh.scope)}`;

  const fetchData = async () => {
    try {
      const response = await axios.get('https://login.salesforce.com/services/data/v54.0/query/?q=SELECT+Name,Id,AccountId,CloseDate,Amount,+StageName,Probability,Type+FROM+Opportunity', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post('https://login.salesforce.com/services/oauth2/token', null, {
        params: {
          grant_type: 'refresh_token',
          client_id: salesforceConfigRefresh.clientId,
          refresh_token: refreshToken,
        },
      });
      const newAccessToken = response.data.access_token;
      setAccessToken(newAccessToken);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  return (
    <div className="App">
      {!accessToken ? (
        <a href={authUrl}>Login with Salesforce</a>
      ) : (
        <div>
          <p>Access Token: {accessToken}</p>
          <p>Refresh Token: {refreshToken}</p>
          <button onClick={fetchData}>Fetch Data</button>
          <div> </div>
          <button onClick={refreshAccessToken}>Refresh Access Token</button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
