export const convertToBinaryFile = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const binaryData = reader.result;
            resolve(binaryData);
        }
        reader.onerror = (error) => {
            reject(error);
        }
        reader.readAsBinaryString(file);
    })
}