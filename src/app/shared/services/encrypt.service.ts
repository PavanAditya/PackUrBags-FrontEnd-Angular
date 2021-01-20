import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  public keySize = 256;
  public ivSize = 128;
  public iterations = 100;
  private password = environment.encryptionKey;

  constructor() { }

  // ? The set method is use for encrypt the value.
  public set(msg: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8);
    const key = CryptoJS.PBKDF2(this.password, salt, {
      keySize: this.keySize / 32,
      iterations: this.iterations
    });

    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(msg, key, {
      iv,
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    });

    // ? salt, iv will be hex 32 in length
    // ? append them to the ciphertext for use  in decryption
    const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
    return transitmessage;
  }

  // ? The get method is use for decrypt the value.
  public get(transitmessage: string): string {
    try {
      const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
      const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
      const encrypted = transitmessage.substring(64);

      const key = CryptoJS.PBKDF2(this.password, salt, {
        keySize: this.keySize / 32,
        iterations: this.iterations
      });

      const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (err) {
      return null;
    }
  }
}
