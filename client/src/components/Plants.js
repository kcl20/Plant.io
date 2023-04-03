import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";

import { Button, Card, Image, Icon, Popup, List } from "semantic-ui-react";

const Plants = () => {
  const authState = useSelector((state) => state.authReducer);
  const [plants, setPlants] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchPlants = useCallback(() => {
    const config = {
      url: "/plants/user",
      method: "get",
      headers: { Authorization: authState.token },
    };
    fetchData(config, { showSuccessToast: false }).then((data) =>
      setPlants(data.plants),
    );
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchPlants();
  }, [authState.isLoggedIn, fetchPlants]);

  const handleDelete = (id) => {
    const config = {
      url: `/plants/${id}`,
      method: "delete",
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchPlants());
  };

  return (
    <>
      <div class="my-2 mx-auto max-w-[1000px] py-4">
        {plants.length !== 0 && (
          <h2 class="my-8 text-xl text-center">
            Your plants ({plants.length})
          </h2>
        )}
        {loading ? (
          <Loader />
        ) : (
          
          <div class="ui fluid raised link centered cards" >
            {plants.length === 0 ? (
              <div class="w-[600px] h-[300px] flex items-center justify-center gap-4">
                <span>No plants found</span>
                <Link
                  to="/plants/add"
                  class="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2"
                >
                  + Add new plant{" "}
                </Link>
              </div>
            ) : (
              plants.map((plant, index) => (
                <Card>
                  <Card.Content>
                    {/* <Card.Header>{plant.name}</Card.Header> */}
                    <Card.Header>{plant.name || "No Name"}</Card.Header>
                  </Card.Content>
                  <Image
                    src={plant.secure_url}
                    wrapped
                    ui={false}
                  />
                  <Card.Content>
                    <Card.Meta>{`Plant #${index + 1}`}</Card.Meta>
                    <Card.Description>{plant.description}</Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                  <List celled horizontal >
                      <List.Item>
                        <Popup trigger={<span><Icon name="sun" />{plant.sunlight}</span> }content="Sunlight" inverted/>
                      </List.Item>
                      <List.Item>
                        <Popup trigger={<span><Icon name="tint" />{plant.water}</span>} content="Water" inverted/>
                      </List.Item>
                      <List.Item>
                        <Popup trigger={<span><Icon name="percent" />{plant.humidity}</span>} content="Humidity" inverted/>
                      </List.Item>
                      <List.Item>
                        <Popup trigger={<span><Icon name="thermometer" />{plant.temperature}</span>} content="Temperature"  inverted/>
                      </List.Item>
                    </List>
                  </Card.Content>
                  <Card.Content extra>
                    <div class="ui fluid two bottom attached buttons">
                      <Button animated="vertical" color="blue" as="a">
                        <Link to={`/plants/${plant._id}`} >
                          <Button.Content hidden>Edit</Button.Content>
                          <Button.Content visible>
                            <Icon name="edit"/>
                          </Button.Content>
                        </Link>
                      </Button>
                      <Button animated="vertical" onClick={() => handleDelete(plant._id)}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                          <Icon name="trash" />
                        </Button.Content>
                      </Button>
                    </div>
                  </Card.Content>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Plants;
