import CryptoJS from 'crypto-js'

export const encrypt = (plainText: string) => {
    const ciphertext = CryptoJS.AES.encrypt(plainText, 'key123').toString();
    return ciphertext
}

export const decrypt = (ciphertext: string) => {
    const bytes  = CryptoJS.AES.decrypt(ciphertext, 'key123');
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText
}
