// Save UserId to localStorage
const saveUserIdToLocalStorage = (userId,role) => {
    localStorage.setItem('userid', userId);
    localStorage.setItem('role', role);
};

// Retrieve UserId from localStorage
const getUserIdFromLocalStorage = () => {
    return localStorage.getItem('userid');
};
const getRoleFromLocalStorage = () => {
    return localStorage.getItem('role');
};

// Remove UserId from localStorage (logout)
const removeUserIdFromLocalStorage = () => {
    localStorage.removeItem('userid');
    localStorage.removeItem('role');
};

export { saveUserIdToLocalStorage, getUserIdFromLocalStorage, removeUserIdFromLocalStorage,getRoleFromLocalStorage };
// Function to encrypt data
// Define your encryption and decryption keys


// Function to generate encryption key
// const generateEncryptionKey = () => {
//     return window.crypto.subtle.generateKey(
//         {
//             name: 'AES-GCM',
//             length: 256,
//         },
//         true,
//         ['encrypt', 'decrypt']
//     );
// };
//
// // Function to generate decryption key
// const generateDecryptionKey = () => {
//     return window.crypto.subtle.generateKey(
//         {
//             name: 'AES-GCM',
//             length: 256,
//         },
//         true,
//         ['encrypt', 'decrypt']
//     );
// };
//
// // Function to encrypt data using the encryption key
// const encryptData = (data, encryptionKey) => {
//     // Convert the data to a Uint8Array
//     const dataBuffer = new TextEncoder().encode(data);
//
//     // Generate a random initialization vector
//     const iv = window.crypto.getRandomValues(new Uint8Array(12));
//
//     // Encrypt the data using AES-GCM algorithm
//     return window.crypto.subtle.encrypt(
//         {
//             name: 'AES-GCM',
//             iv: iv,
//         },
//         encryptionKey,
//         dataBuffer
//     ).then(encrypted => {
//         // Combine the IV and encrypted data into a single array
//         const combined = new Uint8Array(iv.length + encrypted.byteLength);
//         combined.set(iv, 0);
//         combined.set(new Uint8Array(encrypted), iv.length);
//         return combined;
//     });
// };
//
// // Function to decrypt data using the decryption key
// const decryptData = (encryptedData, decryptionKey) => {
//     // Split the combined array into IV and encrypted data
//     const iv = encryptedData.slice(0, 12);
//     const data = encryptedData.slice(12);
//
//     // Decrypt the data using AES-GCM algorithm
//     return window.crypto.subtle.decrypt(
//         {
//             name: 'AES-GCM',
//             iv: iv,
//         },
//         decryptionKey,
//         data
//     ).then(decrypted => {
//         // Convert the decrypted data to a string
//         return new TextDecoder().decode(decrypted);
//     });
// };
//
// // Usage example:
//
// // Generate encryption and decryption keys
// Promise.all([generateEncryptionKey(), generateDecryptionKey()]).then(keys => {
//     const encryptionKey = keys[0];
//     const decryptionKey = keys[1];
//
//     // Save UserId and role to localStorage with encryption
//     const saveUserIdToLocalStorage = (userId, role) => {
//         encryptData(userId, encryptionKey).then(encryptedUserId => {
//             localStorage.setItem('userid', JSON.stringify(Array.from(encryptedUserId)));
//         });
//         encryptData(role, encryptionKey).then(encryptedRole => {
//             localStorage.setItem('role', JSON.stringify(Array.from(encryptedRole)));
//         });
//     };
//
//     // Retrieve UserId from localStorage and decrypt it
//     const getUserIdFromLocalStorage = () => {
//         const encryptedUserId = JSON.parse(localStorage.getItem('userid'));
//         return decryptData(new Uint8Array(encryptedUserId), decryptionKey);
//     };
//
//     // Retrieve role from localStorage and decrypt it
//     const getRoleFromLocalStorage = () => {
//         const encryptedRole = JSON.parse(localStorage.getItem('role'));
//         return decryptData(new Uint8Array(encryptedRole), decryptionKey);
//     };
//
//     // Remove UserId and role from localStorage (logout)
//     const removeUserIdFromLocalStorage = () => {
//         localStorage.removeItem('userid');
//         localStorage.removeItem('role');
//     };
// });


