import admin from "firebase-admin";
import * as serviceAccount from "../rms-api-27efd-firebase-adminsdk-rxdlc-f160ab9fc3.json";
// import google from 'google-auth-library'

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

export const adminApp = admin.initializeApp({
  credential: admin.credential.cert(params),
});
