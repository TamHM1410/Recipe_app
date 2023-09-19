import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { createNewRecipe } from "../Services/RecipeService";
import Card from "react-bootstrap/Card";
import React from "react";
import { getAllRecipe } from "../Services/RecipeService";
import DetailRecipe from "./Detail";
import { getRecipeById } from "../Services/RecipeService";
import { toast } from "react-toastify";
import { Context } from "../Context/Context.js";
import { useContext } from "react";

const Recipe = () => {
  /////////////State
  const { IdContext, NameContext, ArrContext, DesContext, ImgContext } =
    useContext(Context);
  const [arr, setArr] = useState([]);
  const [selectId, setSelectId] = useState();
  const [listRecipe, setListRecipe] = useState([]);
  const [name, setName] = useState();
  const [img, setImg] = useState();
  const [des, setDes] = useState();
  const [isHover, setIsHover] = useState(false);
  const [inputList, setInputList] = useState([]);
  const [inputListId, setInputListId] = useState(0);
  const [isAdd, setAdd] = useState(false);

  const [selectedValue, setSelectedValue] = useState([]);
  const [isAddIng, setAddIng] = useState(false);

  ///////////function

  const handleOnAddIng = () => {
    setInputListId((prevId) => prevId + 1);
    setSelectId(inputListId + 1);
    setInputList((prevList) => [...prevList, ""]);
    setSelectedValue((prevList) => [...prevList, ""]);
    setAddIng(true);
  };

  const handleRemoveInput = (id) => {
    setInputList((prevList) => prevList.filter((_, index) => index !== id));
  };

  const handleChangeInput = (id, value) => {
    setInputList((prevList) =>
      prevList.map((item, index) => (index === id ? value : item))
    );
  };

  const handleOnAdd = () => {
    setAdd(true);
  };
  const [isShowDetailModal, setIsShowDetailMoDal] = useState(false);
  const handleClose = () => {
    setIsShowDetailMoDal(false);
  };

  const [recipeId, setRecipeId] = useState();
  const handleDetail = async (e) => {
    let res = await getRecipeById(recipeId);

    await setName(res.data.name);
    await setImg(res.data.url);
    await setDes(res.data.description);
    await setArr(res.data.arr);
    await setIsShowDetailMoDal(true);
    await IdContext(recipeId);
    await NameContext(res.data.name);
    await ArrContext(res.data.arr);
    await DesContext(res.data.description);
    await ImgContext(res.data.url);
    // NameContext,ArrContext,DesContext,ImgContext
  };
  const handleSetId = (e) => {
    setRecipeId(e.id);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };
  const [previewImage, setPreviewImage] = useState(null);
  const handleInputChange = (event) => {
    const url = event.target.value;
    setImg(url);

    setPreviewImage(url);
  };
  const handleCancle = () => {
    setAdd(false);
  };

  const getRecipe = async () => {
    let res = await getAllRecipe();

    if (res && res.data) {
      res.data.sort((a, b) => b.id - a.id);

      await setListRecipe(res.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await createNewRecipe(name, img, des, arr);

    toast.success("Add Success");
    setPreviewImage(null);
    setAdd(false);
    setName();
    setImg();
    setDes();
    setArr([]);
    setInputList([]);
    setSelectedValue([]);
    await getRecipe();
  };

  const handleSelectChange = (id, value) => {
    setSelectedValue((prevList) =>
      prevList.map((item, index) => (index === id ? value : item))
    );

    const updatedSelectedValue = [...selectedValue];
    updatedSelectedValue[id] = value;

    const merghArr = inputList.map((val, index) => ({
      name: val,
      number: updatedSelectedValue[index],
    }));
    setArr(merghArr);
  };

  ////////////////use Effect

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <Button variant="success" onClick={() => handleOnAdd()}>
                Add New Recipe
              </Button>
            </Col>
            {isAdd === false ? (
              <Col>
                <h1>Please Select a recipe!</h1>
              </Col>
            ) : (
              <Col>
                <Form onSubmit={handleSubmit}>
                  <Button
                    variant="success"
                    type="submit"
                    disabled={name && img && des ? false : true}
                  >
                    Save
                  </Button>
                  <> </>
                  <Button
                    variant="danger"
                    type="submit"
                    onClick={() => handleCancle()}
                  >
                    Cancle
                  </Button>
                  <Form.Group
                    className="mb-3"
                    onChange={(event) => setName(event.target.value)}
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="Name" placeholder="Enter name" />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    value={img}
                    onChange={handleInputChange}
                  >
                    <Form.Label>Img URL</Form.Label>
                    <Form.Control type="img" placeholder="Enter img url" />
                  </Form.Group>
                  <div style={{ width: "100px", height: "100px" }}>
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ width: "100%", height: "100%" }}
                      />
                    )}
                  </div>
                  <Form.Group
                    className="mb-3"
                    onChange={(event) => setDes(event.target.value)}
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="description" />
                  </Form.Group>
                </Form>
                {isAddIng && isAddIng === true ? (
                  <>
                    <div>
                      <div>
                        {inputList.map((input, index) => (
                          <div key={index}>
                            <input
                              type="text"
                              value={input}
                              onChange={(e) =>
                                handleChangeInput(index, e.target.value)
                              }
                              style={{ marginRight: "10px", marginTop: "10px" }}
                            />
                            <select
                              onChange={(e) =>
                                handleSelectChange(index, e.target.value)
                              }
                              style={{ marginRight: "10px" }}
                            >
                              <option>--select--</option>

                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                            <Button
                              variant="danger"
                              onClick={() => handleRemoveInput(index)}
                            >
                              X
                            </Button>
                            <br />
                          </div>
                        ))}
                      </div>
                    </div>{" "}
                  </>
                ) : null}
                <Button variant="success" onClick={handleOnAddIng}>
                  Add Ingrediant
                </Button>
              </Col>
            )}
          </Row>
        </Container>
      </div>
      <div>
        <Container>
          <Row>
            <Col>
              {listRecipe &&
                listRecipe.length > 0 &&
                listRecipe.map((item, index) => {
                  return (
                    <>
                      <Card
                        key={index}
                        onClick={() => handleDetail(item)}
                        onMouseEnter={() => handleSetId(item)}
                        // onMouseEnter={() => handleonMouseEnter(item)}
                        onMouseLeave={onMouseLeave}
                        style={{
                          width: "30rem",
                          backgroundColor:
                            isHover == true ? "yellow" : "whitesmoke",
                          marginTop: "50px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <h1>{item.name}</h1>
                          <img
                            src={item.url}
                            alt={item.name}
                            width="60"
                            height="60"
                            style={{
                              marginLeft: "auto",
                              marginTop: "40px",
                              marginRight: "10px",
                            }}
                          ></img>
                        </div>
                        <p>{item.description}</p>
                      </Card>
                    </>
                  );
                })}
            </Col>
          </Row>
        </Container>
        <DetailRecipe
          isShowDetailModal={isShowDetailModal}
          setIsShowDetailMoDal={setIsShowDetailMoDal}
          handleClose={handleClose}
          recipeId={recipeId}
          name={name}
          img={img}
          des={des}
          arr={arr}
          setArr={setArr}
          getRecipe={getRecipe}
        />
      </div>
    </>
  );
};
export default Recipe;
