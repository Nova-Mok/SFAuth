import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { salesforceConfig } from './config';

function App() {
  const [accessToken, setAccessToken] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    // Parse access token from URL hash after successful login
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const token = urlParams.get('access_token');
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const authUrl = `https://login.salesforce.com/services/oauth2/authorize?client_id=${salesforceConfig.clientId}&redirect_uri=${encodeURIComponent(salesforceConfig.redirectUri)}&response_type=${salesforceConfig.responseType}&scope=${encodeURIComponent(salesforceConfig.scope)}`;

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