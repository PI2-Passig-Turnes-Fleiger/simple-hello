const CryptoJS = require('crypto-js');

// Code goes here
var keySize = 256;
var ivSize = 128;
var iterations = 100;

var pass = "DUSENFUAPGMGRICOGKPEKWMVOGOAMBPW";


/**
 * Função usada para criptografar uma mensagem qualquer.
 * 
 * @param {string} msg - mensagem a ser criptografada
 */
function encrypt (msg) {
  var salt = CryptoJS.lib.WordArray.random(128/8);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var iv = CryptoJS.lib.WordArray.random(ivSize/8);
  
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  });
  
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return transitmessage;
}

/**
 * Função usada para descriptografar uma mensagem
 * 
 * @param {string} msg - mensagem a ser descriptografada
 */
function decrypt (msg) {
  var salt = CryptoJS.enc.Hex.parse(msg.substr(0, 32));
  var iv = CryptoJS.enc.Hex.parse(msg.substr(32, 32))
  var encrypted = msg.substring(64);
  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });

  var decrypted = CryptoJS.AES.decrypt(encrypted, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
    
  })
  return decrypted.toString(CryptoJS.enc.Utf8);
}
module.exports = { encrypt, decrypt }