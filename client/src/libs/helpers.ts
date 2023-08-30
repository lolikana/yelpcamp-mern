export const convert2base64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = error => reject(error);

    reader.readAsDataURL(file);
  });
};
