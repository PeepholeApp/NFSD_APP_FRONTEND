import React, { useState } from "react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { Stack } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function UploadPhotos({ images, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log("que es esto", formData);
    const files = e.target.files;
    console.log(e.target.files);
    //Toma todos los archivos e itera y agrega al formData
    for (let file of files) {
      formData.append("file", file);
    }

    setUploading(true);
    const response = await axios.post("http://localhost:3001/image", formData);
    console.log(response.data);
    onChange(response.data);
    setUploading(false);
  };

  const onImageDelete = (index) => () => {
    onChange(images.filter((_image, imageIndex) => imageIndex != index));
  };

  return (
    <Stack>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        disabled={uploading}
      >
        Upload file
        <VisuallyHiddenInput type="file" multiple onChange={handleUpload} />
      </Button>
      <Box sx={{ width: "100%" }}>{uploading ? <LinearProgress /> : null}</Box>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {images &&
          images.map((url, index) => (
            <Stack sx={{ "& button": { m: 1 } }} key={url}>
              <img
                width={200}
                height={200}
                src={url}
                style={{ objectFit: "cover" }}
              />
              <Button
                variant="contained"
                disableElevation
                size="small"
                startIcon={<DeleteIcon />}
                onClick={onImageDelete(index)}
              >
                Delete
              </Button>
            </Stack>
          ))}
      </Box>
    </Stack>
  );
}
