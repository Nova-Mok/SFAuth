// this is for Boostup app 
export const salesforceConfig = {
  clientId: '3MVG9IHf89I1t8hqdGRTnWKq5yhpuPMXm05x6_lBp2qqKO_nm8Mb5sHsuc6L6iUWzuSVEE2nNRGhwaUvm0YNh',
  clientSecret: '1D8264A39507696FA5BB462318551BB1E958708CF5842B41DE3975AAAFD63654',
  redirectUri: 'http://localhost:3000/oauth-callback',
  responseType: 'code',
  scope: 'refresh_token',
};

// this is for NovaStudio App 
export const salesforceConfigRefresh = {
  clientId: '3MVG9pRzvMkjMb6miYehUkWUQ4OIN6_RQAJ298_ohVitiFua3e0QqoQSoCo4O99G9Kbx8ygiIkwqVYHf1dtJM',
  clientSecret: '62CDDC7725806144B891D6D302EE7AFCC907304C70682EBB8181CAD3206B5AA2',
  redirectUri: 'http://localhost:3000/oauth-callback',
  responseType: 'token',
  scope: 'refresh_token',
};