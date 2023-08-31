import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { salesforceConfig } from './config';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      getAccessToken(code);
    } else if (refreshToken) {
      refreshTokenFlow();
    }
  }, [refreshToken]);

  const authUrl = `https://login.salesforce.com/services/oauth2/authorize?client_id=${salesforceConfig.clientId}&redirect_uri=${encodeURIComponent(salesforceConfig.redirectUri)}&response_type=${salesforceConfig.responseType}&scope=${encodeURIComponent(salesforceConfig.scope)}`;

  const getAccessToken = async (code) => {
    try {
      const response = await axios.post('https://login.salesforce.com/services/oauth2/token', null, {
        params: {
          grant_type: 'authorization_code',
          client_id: salesforceConfig.clientId,
          client_secret: salesforceConfig.clientSecret,
          redirect_uri: salesforceConfig.redirectUri,
          code: code,
        },
      });
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  };

  const refreshTokenFlow = async () => {
    try {
      const response = await axios.post('https://login.salesforce.com/services/oauth2/token', null, {
        params: {
          grant_type: 'refresh_token',
          client_id: salesforceConfig.clientId,
          client_secret: salesforceConfig.clientSecret,
          refresh_token: refreshToken,
        },
      });
      setAccessToken(response.data.access_token);
    } catch (error) {
      console.error('Error refreshing access token:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://boostup.my.salesforce.com/services/data/v54.0/query/?q=SELECT+Name,Id,AccountId,CloseDate,Amount,+StageName,Probability,Type+FROM+Opportunity', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      {!accessToken ? (
        <a href={authUrl}>Login with Salesforce</a>
      ) : (
        <div>
          <p>Access Token: {accessToken}</p>
          <button onClick={fetchData}>Fetch Data</button>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
