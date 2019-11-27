const CryptoJS = require('crypto-js');
const mongoose = require('mongoose');
const Key = mongoose.model('Key');

// Code goes here
const keySize = 256;
const ivSize = 128;
const iterations = 100;

/**
 * Função usada para criptografar uma mensagem qualquer.
 * 
 * @param {string} mensagem - mensagem a ser criptografada
 */
async function encrypt (mensagem) {
  mensagem = mensagem.split(';');
  const id = mensagem[0];
  let msg = '';
  for(let i = 1; i < mensagem.length; i++)
    msg += mensagem[i];
  
  const pass = (await Key.findById(id)).key;

  const salt = CryptoJS.lib.WordArray.random(128/8);
  
  const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  const iv = CryptoJS.lib.WordArray.random(ivSize/8);
  
  const encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });

  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  const transitmessage = salt.toString() + iv.toString() + encrypted.toString();
  return id + ';' + transitmessage;
}

/**
 * Função usada para descriptografar uma mensagem
 * 
 * @param {string} mensagem - mensagem a ser descriptografada
 */
async function decrypt (mensagem) {
  const [id, msg] = mensagem.split(';');
  const pass = (await Key.findById(id)).key;

  const salt = CryptoJS.enc.Hex.parse(msg.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(msg.substr(32, 32))
  const encrypted = msg.substring(64);
  
  const key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  const decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}
module.exports = { encrypt, decrypt }