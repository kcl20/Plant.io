import React, { Component } from "react";

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "djj0v2fgw"; 
    const uploadPreset = "q8vxj258"; 

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset

      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function (event) {
        event.preventDefault(); // Add this line to prevent the page from refreshing
        myWidget.open();
      },
      false
    );
  }

  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

export default CloudinaryUploadWidget;
