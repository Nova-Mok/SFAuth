import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = ({ location, setAccessToken }) => {
    const navigate = useNavigate(); // Get the navigate function from React Router
  
  useEffect(() => {
    console.log("OAuthCallback: Starting authentication...");
    const clientId = '3MVG9pRzvMkjMb6miYehUkWUQ4OIN6_RQAJ298_ohVitiFua3e0QqoQSoCo4O99G9Kbx8ygiIkwqVYHf1dtJM';
    const clientSecret = '62CDDC7725806144B891D6D302EE7AFCC907304C70682EBB8181CAD3206B5AA2';
    const redirectUri = 'http://localhost:3000/oauth-callback';
    const code = new URLSearchParams(location?.search).get('code');

    
    if (code) {
        axios.post('https://novastudios.my.salesforce.com/services/oauth2/token', null, {
          params: {
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
          },
        }).then(response => {
          console.log("OAuthCallback: Access token received:", response.data.access_token);
          setAccessToken(response.data.access_token);
          console.log("Navigating to data-table..."); // Redirect to the data-table route
        });
      }
      console.log("OAuthCallback: Authentication complete.");
    }, [location, setAccessToken, navigate]);
  
    return (
      <div>Logging in...</div>
    );
  };
  
  export default OAuthCallback;