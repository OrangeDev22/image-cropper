import React, { useState } from "react";
import "./App.css";
import FilePicker from "./utils/FilePicker";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { BsArrowsMove, BsCrop, BsZoomIn, BsZoomOut } from "react-icons/bs";
import { FiRotateCcw, FiRotateCw } from "react-icons/fi";
import { GiHorizontalFlip, GiVerticalFlip } from "react-icons/gi";
import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai";

function App() {
  const [showCropper, setShowCropper] = useState(false);
  const [image, setImage] = useState("");
  const [cropper, setCropper] = useState<any>();

  const handleCropImage = () => {
    if (cropper) {
      setImage(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleClearCanvas = (canvas: any) => {
    let canvasEl = canvas.path[1];
    if (canvasEl) {
      canvasEl?.classList?.add("CropperRefresh");
      setTimeout(() => {
        canvasEl?.classList?.remove("CropperRefresh");
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-full text-white">
      <header className="bg-neutral-500 p-2 w-full flex">
        <h1 className="flex-grow">Image Cropper</h1>
        {showCropper && (
          <div className="flex items-center mx-auto gap-2">
            <button
              className="bg-white rounded-full hover:bg-gray-100"
              onClick={() => handleCropImage()}
            >
              <AiFillCheckCircle
                size={30}
                className="fill-green-500 hover:fill-green-700"
              />
            </button>
            <button
              className="bg-white rounded-full hover:bg-gray-100"
              onClick={() => {
                setImage("");
                setShowCropper(false);
              }}
            >
              <AiFillCloseCircle
                size={30}
                className="fill-red-500 hover:fill-red-700"
              />
            </button>
          </div>
        )}
      </header>
      <main className="flex-grow flex flex-col bg-neutral-800 justify-center">
        {!showCropper ? (
          <button
            className="bg-orange-300 p-2 rounded mx-auto"
            onClick={async () => {
              const { base64String, mime } = await FilePicker("image/*");
              setShowCropper(true);
              setImage(`data:${mime};base64,${base64String}`);
              console.log("--base 64 string", mime);
            }}
          >
            Select your image
          </button>
        ) : (
          <>
            <div className="w-full h-full flex-grow relative">
              {/* Controls */}
              <div className="w-full absolute z-20 bottom-4">
                <div className="flex bg-black/[.5] w-1/5 p-2 items-center justify-center mx-auto gap-3 ">
                  <button
                    onClick={() => {
                      cropper.setDragMode("move");
                    }}
                  >
                    <BsArrowsMove />
                  </button>
                  <button
                    onClick={() => {
                      cropper.setDragMode("crop");
                    }}
                  >
                    <BsCrop />
                  </button>
                  <button onClick={() => cropper.zoom(0.1)}>
                    <BsZoomIn />
                  </button>
                  <button onClick={() => cropper.zoom(-0.1)}>
                    <BsZoomOut />
                  </button>
                  <button onClick={() => cropper.rotate(-90)}>
                    <FiRotateCcw />
                  </button>
                  <button onClick={() => cropper.rotate(90)}>
                    <FiRotateCw />
                  </button>
                  <button
                    onClick={() =>
                      cropper.scaleX(-cropper.getData().scaleX || -1)
                    }
                  >
                    <GiHorizontalFlip />
                  </button>
                  <button
                    onClick={() => {
                      cropper.scaleY(-cropper.getData().scaleY || -1);
                    }}
                  >
                    <GiVerticalFlip />
                  </button>
                </div>
              </div>
              {/* Canvas area */}
              <div className="absolute w-full h-full">
                <Cropper
                  src={image}
                  style={{
                    minHeight: "20rem",
                    height: "100%",
                    width: "100%",
                    background: "transparent",
                  }}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  dragMode={"move"}
                  autoCrop={false}
                  background={false}
                  movable={true}
                  checkOrientation={false}
                  restore={false}
                  cropmove={handleClearCanvas}
                  zoom={handleClearCanvas}
                />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
