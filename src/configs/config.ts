const REGION: string | undefined = process.env.REACT_APP_REGION;

const IDENTIFY_POOL_ID: string | undefined =
  process.env.REACT_APP_IDENTIFY_POOL_ID;
const USER_POOL_ID: string | undefined = process.env.REACT_APP_USER_POOL_ID;
const CLIENT_ID: string | undefined = process.env.REACT_APP_CLIENT_ID;

const FRONTEND_URL: string | undefined = process.env.REACT_APP_DOMAIN_NAME;
const BACKEND_URL: string | undefined = process.env.REACT_APP_BACKEND_URL;

const COGNITO_DOMAIN: string | undefined = process.env.REACT_APP_COGNITO_DOMAIN;
const SIGN_OUT_URI: string | undefined = process.env.REACT_APP_SIGN_OUT_URI;
const SIGN_IN_URI: string | undefined = process.env.REACT_APP_SIGN_IN_URI;

export const config = {
  frontend_url: String(FRONTEND_URL),
  backend_url: String(BACKEND_URL),
  amplifyConfig: {
    aws_project_region: REGION,
    aws_cognito_identity_pool_id: IDENTIFY_POOL_ID,
    aws_cognito_region: REGION,
    aws_user_pools_id: USER_POOL_ID,
    aws_user_pools_web_client_id: CLIENT_ID,
    federationTarget: 'COGNITO_USER_POOLS',
    oauth: {
      domain: COGNITO_DOMAIN,
      redirectSignOut: SIGN_OUT_URI,
      redirectSignIn: SIGN_IN_URI,
      responseType: 'code',
    },
  },
};
