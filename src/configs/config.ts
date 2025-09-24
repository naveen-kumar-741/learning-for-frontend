const REGION: string | undefined = import.meta.env.VITE_REGION;
const IDENTIFY_POOL_ID: string | undefined = import.meta.env.VITE_IDENTIFY_POOL_ID;
const USER_POOL_ID: string | undefined = import.meta.env.VITE_USER_POOL_ID;
const CLIENT_ID: string | undefined = import.meta.env.VITE_CLIENT_ID;

const FRONTEND_URL: string | undefined = import.meta.env.VITE_DOMAIN_NAME;
const BACKEND_URL: string | undefined = import.meta.env.VITE_BACKEND_URL;
const BACKEND_URL_FOR_WEBSOCKET: string | undefined =
  import.meta.env.VITE_BACKEND_URL_FOR_WEBSOCKET;

const COGNITO_DOMAIN: string | undefined = import.meta.env.VITE_COGNITO_DOMAIN;
const SIGN_OUT_URI: string | undefined = import.meta.env.VITE_SIGN_OUT_URI;
const SIGN_IN_URI: string | undefined = import.meta.env.VITE_SIGN_IN_URI;

export const config = {
  frontend_url: String(FRONTEND_URL),
  backend_url: String(BACKEND_URL),
  backend_url_for_websocket: String(BACKEND_URL_FOR_WEBSOCKET),
  amplifyConfig: {
    aws_project_region: REGION,
    aws_cognito_identity_pool_id: IDENTIFY_POOL_ID,
    aws_cognito_region: REGION,
    aws_user_pools_id: USER_POOL_ID,
    aws_user_pools_web_client_id: CLIENT_ID,
    federationTarget: "COGNITO_USER_POOLS",
    oauth: {
      domain: COGNITO_DOMAIN,
      redirectSignOut: SIGN_OUT_URI,
      redirectSignIn: SIGN_IN_URI,
      responseType: "code",
    },
  },
};
