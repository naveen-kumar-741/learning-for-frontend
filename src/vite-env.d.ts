/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REGION: string;
  readonly VITE_IDENTIFY_POOL_ID: string;
  readonly VITE_USER_POOL_ID: string;
  readonly VITE_CLIENT_ID: string;
  readonly VITE_DOMAIN_NAME: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_BACKEND_URL_FOR_WEBSOCKET: string;
  readonly VITE_COGNITO_DOMAIN: string;
  readonly VITE_SIGN_OUT_URI: string;
  readonly VITE_SIGN_IN_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
