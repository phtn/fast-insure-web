import admin, { type ServiceAccount } from "firebase-admin";

const SA = JSON.parse(String(process.env.SA)) as ServiceAccount;

export default async function authorize() {
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(SA),
    });
  }
}
