import {environment} from "../../environments/environment";

export async function hashPassword(password: string): Promise<string> {
  const secret = environment.HASH_SECRET || 'default_secret';
  const combinedData = password + secret;
  const encoder = new TextEncoder();
  const data = encoder.encode(combinedData);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
