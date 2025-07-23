export async function encodeMessage(imageDataUrl: string, message: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) return;
      
      const data = imageData.data;
      const messageWithDelimiter = message + '\0';
      const messageBits = stringToBits(messageWithDelimiter);
      
      for (let i = 0; i < messageBits.length; i++) {
        const pixelIndex = i * 4;
        if (pixelIndex < data.length) {
          data[pixelIndex] = (data[pixelIndex] & 0xFE) | parseInt(messageBits[i]);
        }
      }
      
      ctx?.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL());
    };
    
    img.src = imageDataUrl;
  });
}

export async function decodeMessage(imageDataUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
      if (!imageData) {
        resolve('No hidden message found in this image.');
        return;
      }
      
      const data = imageData.data;
      let binaryMessage = '';
      
      for (let i = 0; i < data.length; i += 4) {
        binaryMessage += (data[i] & 1).toString();
      }
      
      const message = bitsToString(binaryMessage);
      
      if (message && message.length > 0) {
        resolve(`Hidden message detected: "${message}"`);
      } else {
        resolve('No hidden message found in this image.');
      }
    };
    
    img.src = imageDataUrl;
  });
}

function stringToBits(str: string): string {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(2).padStart(8, '0');
  }
  return result;
}

function bitsToString(bits: string): string {
  let result = '';
  for (let i = 0; i < bits.length; i += 8) {
    const byte = bits.slice(i, i + 8);
    if (byte.length === 8) {
      const charCode = parseInt(byte, 2);
      if (charCode === 0) break;
      result += String.fromCharCode(charCode);
    }
  }
  return result;
}