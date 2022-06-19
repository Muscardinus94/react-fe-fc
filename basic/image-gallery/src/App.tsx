import React, { useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "./App.css";
import ImageBox from "./components/imageBox";

function App() {
  const [imageList, setImageList] = useState<string[]>([]);
  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles.length !== 0) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setImageList((prev) => [...prev, event.target?.result as string]);
        };
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container">
      <div className={"gallery-box " + (imageList.length > 0 && "row")}>
        {imageList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다.
            <br />
            이미지를 추가해주세요.
          </div>
        )}

        {imageList.map((el, idx) => (
          <ImageBox src={el} key={el + idx} />
        ))}
        <div {...getRootProps()} className="plus-box">
          <input
            type="file"
            {...getInputProps()}
            // onChange={(event) => {
            //   if (event.currentTarget.files?.[0]) {
            //     const file = event.currentTarget.files?.[0];
            //     const reader = new FileReader();
            //     reader.readAsDataURL(file);
            //     reader.onloadend = (event) => {
            //       setImageList((prev) => [
            //         ...prev,
            //         event.target?.result as string,
            //       ]);
            //     };
            //   }
            // }}
          />
          +
        </div>
      </div>
    </div>
  );
}

export default App;
