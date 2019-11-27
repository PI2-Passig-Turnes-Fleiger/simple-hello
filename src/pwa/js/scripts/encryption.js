// Code goes here
const keySize = 256;
const ivSize = 128;
const iterations = 100;

const chave = localStorage.getItem('encryption_key');

const [id_pass, pass] = chave.split(';');

/**
 * Função usada para criptografar uma mensagem qualquer.
 * 
 * @param {string} msg - mensagem a ser criptografada
 */
function encrypt (msg) {
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
  const transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return id_pass + ';' + transitmessage;
}

/**
 * Função usada para descriptografar uma mensagem
 * 
 * @param {string} mensagem - mensagem a ser descriptografada
 */
function decrypt (mensagem) {
  const msg = mensagem.split(';')[1];
  
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