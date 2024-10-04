import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const Imagee = ({
  imagefile,
  setimagefile,
  imageLoadingState,
  uploadedimageurl,
  setuploadedimageurl,
  setImageLoadingState,
  isCustomStyling = false,
  iseditmode,
}) => {
  const inputRef = useRef(null);
  function handleImageFileChange(event) {
    const selectedfile = event.target.files?.[0];
    if (selectedfile) setimagefile(selectedfile);
  }
  function handledragover(event) {
    event.preventDefault();
  }
  function handledrop(event) {
    event.preventDefault();
    const droppedfile = event.dataTransfer.files?.[0];
    if (droppedfile) setimagefile(droppedfile);
  }
  function handleRemoveImage() {
    setimagefile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }
  async function uploadimagetocloudinary() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("file", imagefile);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/admin/imageupload`,
      data
    );
    if (response?.data?.success) {
      setuploadedimageurl(response.data.response.secure_url);
      setImageLoadingState(false);
    }
  }
  useEffect(() => {
    if (imagefile !== null) uploadimagetocloudinary();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagefile]);
  return (
    <div
      className={`w-full  mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
    >
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        onDragOver={(e) => handledragover(e)}
        onDrop={(e) => handledrop(e)}
        className={`${
          iseditmode ? "opacity-60" : ""
        }border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={iseditmode}
        />
        {!imagefile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              iseditmode ? "cursor-not-allowed" : ""
            }flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 text-primary mr-2 h-8" />
            </div>
            <p className="text-sm font-medium">{imagefile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Imagee;
