import React, { Component, useEffect, useRef, useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";
import {
  Button,
  Divider,
  Dropdown,
  Grid,
  Segment,
  Image,
} from "semantic-ui-react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const Plant = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { plantId } = useParams();
  const [options, setOptions] = useState([]);
  const previousController = useRef();

  const cloudName = "djj0v2fgw";
  const uploadPreset = "q8vxj258";

  const apiKey = "sk-Z5HR642b4474e3852420";

  var myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: cloudName,
      uploadPreset: uploadPreset,
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        document
          .getElementById("uploadedimage")
          .setAttribute("src", result.info.secure_url);
        setFormData({ ...formData, secure_url: result.info.secure_url });
      }
    }
  );

  const getData = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }
    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    fetch(
      `https://perenual.com/api/species-list?key=${apiKey}&q=` + searchTerm,
      {
        signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        console.log("search term: " + searchTerm + ", results: ", myJson.data);
        const updatedOptions = myJson.data.map((p) => {
          console.log(p.common_name);
          return { name: p.common_name };
        });
        setOptions(updatedOptions);
      });
  };

  const onInputChange = (e, value, reason) => {
    if (value) {
      getData(value);
    } else {
      setOptions([]);
    }
  };

  const sun_options = [
    {
      text: "Low",
      value: "low",
    },
    {
      text: "Medium",
      value: "medium",
    },
    {
      text: "High",
      value: "high",
    },
  ];

  const mode = plantId === undefined ? "add" : "update";
  const [plant, setPlant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sunlight: "",
    water: "",
    humidity: "",
    temperature: "",
    secure_url: null,
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

  const handleUploadButton = (e) => {
    e.preventDefault();
    myWidget.open();
  };

  const handleChange = (e, data) => {
    if (e.target.value) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [data.name]: data.value,
      });
    }
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
        <Segment>
          <Grid columns={2} stackable>
            <Divider vertical>Plant</Divider>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <form class="ui form m-8 my-16 max-w-[1000px] p-8 border-2 shadow-md rounded-md">
                  <div class="field">
                    <label>Name</label>
                    <Autocomplete
                      options={options}
                      onInputChange={onInputChange}
                      getOptionLabel={(option) => option.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Name of the Plant"
                          name="name"
                          id="name"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      )}
                    />

                    {fieldError("name")}
                  </div>

                  <div class="field">
                    <label>Description</label>
                    <textarea
                      rows="3"
                      name="description"
                      id="description"
                      value={formData.description}
                      placeholder="Describe the plant.."
                      onChange={handleChange}
                    />
                    {fieldError("description")}
                  </div>

                  <div class="four fields">
                    <div class="field">
                      <label>Sunlight </label>
                      <Dropdown
                        name="sunlight"
                        id="sunlight"
                        value={formData.sunlight}
                        placeholder="Sunlight"
                        fluid
                        selection
                        search
                        scrolling
                        options={sun_options}
                        onChange={handleChange}
                      />
                      {fieldError("sunlight")}
                    </div>
                    <div class="field">
                      <label>Water (ml)</label>
                      <input
                        type="number"
                        name="water"
                        id="water"
                        value={formData.water}
                        placeholder="Water"
                        onChange={handleChange}
                      />
                      {fieldError("water")}
                    </div>
                    <div class="field">
                      <label>Humidity (%)</label>
                      <input
                        type="number"
                        name="humidity"
                        id="humidity"
                        value={formData.humidity}
                        placeholder="Humidity"
                        onChange={handleChange}
                      />
                      {fieldError("humidity")}
                    </div>
                    <div class="field">
                      <label>Temperature (°C)</label>
                      <input
                        type="number"
                        name="temperature"
                        id="temperature"
                        value={formData.temperature}
                        placeholder="Temperature"
                        onChange={handleChange}
                      />
                      {fieldError("temperature")}
                    </div>
                    <div class="field hidden">
                      <label>secure_url</label>
                      <input
                        type="string"
                        name="secure_url"
                        id="secure_url"
                        value={formData.secure_url}
                        placeholder="secure_url"
                        onChange={handleChange}
                      />
                      {fieldError("secure_url")}
                    </div>
                  </div>
                  <div class="ui three bottom attached buttons">
                    <button
                      class="ui olive submit button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {mode === "add" ? "Add plant" : "Update Plant"}
                    </button>

                    <button
                      class="ui yellow submit button"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                    {mode === "update" && (
                      <button
                        class="ui orange submit button"
                        onClick={handleReset}
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </form>
              </Grid.Column>

              <Grid.Column textAlign="center">
                <div class="m-8">
                  <Image
                    id="uploadedimage"
                    src={formData.secure_url}
                    size="medium"
                    circular
                    centered
                    dimmer
                  ></Image>
                </div>
                <Button color="olive" onClick={handleUploadButton}>
                  Upload Image
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </MainLayout>
    </>
  );
};

export default Plant;
