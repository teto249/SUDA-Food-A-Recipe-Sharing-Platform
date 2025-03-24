"use client";

import Image from "next/image";
import classes from "./image-picker.module.css";
import { useRef, useState } from "react";

export default function ImagePicker({ label, name }) {
  const [pickedImag, setPickedImage] = useState();
  const imageInput = useRef();
  function handelPickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      <label htmlFor="image">{label}</label>
      <div className={classes.preview}>
        {!pickedImag && <p>No Image Picked yet.</p>}
        {pickedImag && (
          <Image src={pickedImag} alt="The Image selected by the user." fill />
        )}
      </div>
      <div className={classes.controls}>
        <input
          className={classes.input}
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className={classes.button}
          onClick={handelPickClick}
        >
          Pick and Image
        </button>
      </div>
    </div>
  );
}
