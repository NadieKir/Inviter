import { FieldProps } from 'formik';
import axios from 'axios';

import { readFileAsBase64 } from 'common/helpers';
import { FileWithUrl } from 'types';
import {
  ImageDropbox,
  ImagePreview,
  ImagePreviewMode,
  InputField,
  InputFieldExternalProps,
} from 'components';
import { createContext, useState } from 'react';
import { httpClient } from 'api/httpClient';

type ImageUploaderProps = InputFieldExternalProps & {
  name: string;
  variant?: ImagePreviewMode;
  placeholderText?: string;
};

export type ImageContextType = {
  imageData: File | null;
};

export const ImageContext = createContext<ImageContextType | null>(null);

export const ImageUploader = ({
  variant = ImagePreviewMode.Thumbnail,
  placeholderText = 'картинку',
  ...inputFieldProps
}: ImageUploaderProps): JSX.Element => {
  const [imageData, setImageData] = useState<File | null>(null);

  return (
    <ImageContext.Provider
      value={{
        imageData,
      }}
    >
      <InputField {...inputFieldProps}>
        {({
          field: { name, value },
          form: { setFieldValue },
          meta: { error },
        }: FieldProps<string | null>) => {
          const image = value;

          const setImage = async (image: File | null): Promise<void> => {
            if (image === null) setFieldValue(name, null);
            else {
              const formData = new FormData();
              formData.append('image', image);

              setFieldValue(name, formData);
              setImageData(image);
              console.log(image);
              // const { data } = await httpClient.post('/uploads', formData);

              // setImageSrc(data.url);
              // setFieldValue(name, data.url);
            }
          };

          const handleUpload = (image: File): void => {
            setImage(image);
          };

          const handleClear = (): void => {
            setImage(null);
          };

          return !image ? (
            <ImageDropbox
              onDrop={handleUpload}
              externalError={error}
              placeholderText={placeholderText}
            />
          ) : (
            <ImagePreview
              variant={variant}
              image={image}
              onClear={handleClear}
            />
          );
        }}
      </InputField>
    </ImageContext.Provider>
  );
};
