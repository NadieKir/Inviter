export const readFileAsBase64 = (file: File) => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      res(reader.result as string);
    };

    reader.readAsDataURL(file);
  });
};