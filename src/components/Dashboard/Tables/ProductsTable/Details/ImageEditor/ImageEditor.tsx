import { useEffect, useState } from "react";

import img from "../../../../../../assets/svg/image.svg";

import styles from "./ImageEditor.module.css";

interface Props {
  isDisabled: boolean;
  imageUrls: string[];
  setImageUrls: (imageUrl: string[]) => void;
  imageFiles: File[];
  setImageFiles: (image: File[]) => void;
}

export default function ImageEditor({
  isDisabled,
  imageUrls,
  setImageUrls,
  imageFiles,
  setImageFiles,
}: Props) {
  const [selectedImage, setSelectedImage] = useState<string>(img);

  // Set selected image
  useEffect(() => {
    if (imageUrls.length === 0) {
      setSelectedImage(img);
    } else {
      setSelectedImage(`http://localhost:3001${imageUrls[0]}`);
    }
  }, [imageUrls]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageFiles([...imageFiles, file]);
      const url = URL.createObjectURL(file);

      if (!imageUrls.some((image) => image === url)) {
        setImageUrls([...imageUrls, URL.createObjectURL(file)]);
      } else {
        setSelectedImage(url);
      }
    }
  }

  function handleSelect(url: string) {
    setSelectedImage(`http://localhost:3001${url}`);
  }

  function handleRemove() {
    setImageUrls(imageUrls.filter((url: string) => url !== selectedImage));
  }

  return (
    <div className={styles.form}>
      <div>
        <div className={styles.imageContainer}>
          {!isDisabled && imageUrls.length > 0 ? (
            <button
              className={`btn btn-outline-danger ${styles.delete}`}
              type="button"
              onClick={handleRemove}
            >
              X
            </button>
          ) : null}
          <img
            className={styles.icon}
            src={selectedImage}
            alt="img"
          />
        </div>
        {isDisabled ? null : <div className="mb-3 form-floating">
          <label className="form-control" htmlFor="images">
            Agregar otra imagen
          </label>
          <input
            className="form-control"
            id="images"
            type="file"
            onChange={handleChange}
          />
        </div>}
      </div>
      <div className={styles.imgList}>
        {imageUrls.map((url) => (
          <div
            key={url}
            className={styles.image}
            onClick={() => handleSelect(url)}
          >
            <img src={`http://localhost:3001${url}`} alt="product" />
          </div>
        ))}
      </div>
    </div>
  );
}
