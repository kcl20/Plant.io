import React, { Component, useEffect, useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import { Text } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";

const Plant = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { plantId } = useParams();

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
          setFormData({secure_url: result.info.secure_url});

      }
    }
  );
     

  const mode = plantId === undefined ? "add" : "update";
  const [plant, setPlant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sunlight: "",
    water: "",
    humidity: "",
    temperature: "",
    secure_url: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add plant" : "Update Plant";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/plants/${plantId}`,
        method: "get",
        headers: { Authorization: authState.token },
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setPlant(data.plant);
        setFormData({
          name: data.plant.name,
          description: data.plant.description,
          sunlight: data.plant.sunlight,
          water: data.plant.water,
          humidity: data.plant.humidity,
          temperature: data.plant.temperature,
          secure_url: data.plant.secure_url,
        });
      });
    }
  }, [mode, authState, plantId, fetchData]);

  const handleUploadButton =(e) => {
    e.preventDefault();
    myWidget.open();
    }



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      name: "",
      description: "",
      sunlight: "",
      water: "",
      humidity: "",
      temperature: "",
      secure_url: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("plant", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    if (mode === "add") {
      const config = {
        url: "/plants",
        method: "post",
        data: formData,
        headers: { Authorization: authState.token },
      };
      fetchData(config).then(() => {
        navigate("/");
      });
    } else {
      const config = {
        url: `/plants/${plantId}`,
        method: "put",
        data: formData,
        headers: { Authorization: authState.token },
      };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <MainLayout>
        {<form class="ui form m-8 my-16 max-w-[1000px] p-8 border-2 shadow-md rounded-md">
          <div class="required field">
            <label>Name</label>
            <input name="name" id="name" value={formData.name} placeholder="Name of the Plant" onChange={handleChange} />
            {fieldError("name")}
          </div>

          <div class="field">
            <label>Description</label>
            <textarea rows="3" name="description" id="description" value={formData.description} placeholder="Describe the plant.." onChange={handleChange} />
            {fieldError("description")}
          </div>

          <div class="four fields">
              <div class="field">
              <label>Sunlight (High/Medium/Low)</label>
              <input type="text" name="sunlight" id="sunlight" value={formData.sunlight} placeholder="Level of Sunlight" onChange={handleChange} />
              {fieldError("sunlight")}
            </div>
            <div class="field">
              <label>Water (ml)</label>
              <input type="number" name="water" id="water" value={formData.water} placeholder="Water" onChange={handleChange} />
              {fieldError("water")}
            </div>
            <div class="field">
              <label>Humidity (%)</label>
              <input type="number" name="humidity" id="humidity" value={formData.humidity} placeholder="Humidity" onChange={handleChange} />
              {fieldError("humidity")}
            </div>
            <div class="field">
              <label>Temperature (°C)</label>
              <input type="number" name="temperature" id="temperature" value={formData.temperature} placeholder="Temperature" onChange={handleChange} />
              {fieldError("temperature")}
            </div>
            <div class="field">
              <label>secure_url</label>
              <input type="string" name="secure_url" id="secure_url" value={formData.secure_url} placeholder="secure_url" />
              {fieldError("secure_url")}
            </div>
          </div>
          <button class="ui green submit button" type="submit" onClick={handleSubmit}>{mode === "add" ? "Add plant" : "Update Plant"}</button>
          <button className='ui red submit button' onClick={() => navigate("/")}>Cancel</button>
          <button className='ui blue submit button' onClick={(handleUploadButton)}>Upload</button>
          {mode === "update" && <button class='ui blue submit button' onClick={handleReset}>Reset</button>}
        </form>}
        <img id="uploadedimage" src=""></img>

        {/* <img id="uploadedimage" src={secure_url}></img> */}
        
      </MainLayout>
    </>
  );
};

export default Plant;
