import Thumbnail from '@components/ui/thumbnail/Thumbnail';
import { ChangeEvent, FC, useEffect, useState } from 'react';

import { convert2base64 } from './../../libs/helpers';
import FieldWrapper from './FieldWrapper';
import { IInputFile } from './types';

const InputFiles: FC<IInputFile> = ({
  register,
  error,
  name,
  resetField,
  // setValue,
  resetFormThumbnail
}) => {
  const [thumbnails, setThumbnails] = useState<
    { file: File; thumbnail: string; name: string; size: string }[]
  >([]);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const files = e.target.files as FileList;

    const filesArray = Array.from(files);

    const convertFileToThumbnail = async (file: File) => {
      const thumbnail = await convert2base64(file);
      const name = file.name;
      const size = (file.size / (1024 * 1000)).toFixed(2);
      return { thumbnail, name, size };
    };

    const newThumbnails = await Promise.all(
      filesArray.map(async file => {
        const thumbnailData = await convertFileToThumbnail(file);
        return { file, ...thumbnailData };
      })
    );

    setThumbnails(newThumbnails);
  };

  const toggleImage = async (fileId: File) => {
    // Find the thumbnail associated with the fileId
    const thumbnailToRemove = thumbnails.find(thumbnail => thumbnail.file === fileId);

    if (!thumbnailToRemove) {
      return; // Thumbnail not found, handle appropriately
    }

    // Filter out the thumbnail to be removed
    const updatedThumbnails = thumbnails.filter(thumbnail => thumbnail.file !== fileId);
    setThumbnails(updatedThumbnails);

    // Create a new FileList excluding the removed file
    const updatedFilesList = updatedThumbnails.map(thumbnail => thumbnail.file);
    const fileList = new DataTransfer();
    updatedFilesList.forEach(file => {
      fileList.items.add(file);
    });

    const convertedFileList = fileList.files;
    // Wait for the state update and then reset the field
    resetField?.(name, {
      defaultValue: convertedFileList
    });
    const input = (document.querySelector(`input[name=${name}]`) as HTMLInputElement)!;
    input.files = convertedFileList;
  };

  useEffect(() => {
    if (resetFormThumbnail) {
      setThumbnails([]);
    }
  }, [resetFormThumbnail]);
  return (
    <>
      <FieldWrapper error={error} name={name}>
        <input
          {...register!(name)}
          name={name}
          type="file"
          accept=".png,.jpg,.jpeg,.gif"
          onChange={handleChange}
          multiple
        />
      </FieldWrapper>
      {!resetFormThumbnail && thumbnails.length > 0 && (
        <div>
          <ul>
            {thumbnails.map(thumbnail => (
              <li key={thumbnail.file.name}>
                <Thumbnail
                  src={thumbnail.thumbnail}
                  name={thumbnail.name}
                  size={thumbnail.size}
                  toggle={() => toggleImage(thumbnail.file)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default InputFiles;
