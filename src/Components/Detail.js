import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getRecipeById } from "../Services/RecipeService";
import NavDropdown from "react-bootstrap/NavDropdown";
import Delete from "./Delete";
import EditRecipe from "./EditRecipe";
import ShoppingList from "./ShoppingList";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/Context.js";
import { useContext } from "react";

const DetailRecipe = (props) => {
  const { ArrContext, IdContext } = useContext(Context);
  const { img, des, name, recipeId, ImgContext, NameContext, DesContext, id } =
    useContext(Context);
  const {
    isShowDetailModal,
    handleClose,

    setIsShowDetailMoDal,

    arr,
    setArr,
    getRecipe,
  } = props;
  const navigate = useNavigate();
  const handleShoppingList = () => {
    ArrContext(arr);
    navigate("/shop");
  };

  const [offCompoent, setOffComponent] = useState(true);

  const [isShowDeleteModal, setShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditMoDal] = useState(false);
  const handleEditModal = () => {
    setIsShowEditMoDal(true);
    setIsShowDetailMoDal(false);
  };
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
    setIsShowDetailMoDal(false);
  };

  return (
    <>
      {offCompoent == true ? (
        <>
          <Modal size="lg" show={isShowDetailModal}>
            <Modal.Header>
              <Modal.Title
                id="example-modal-sizes-title-lg"
                style={{ textAlign: "center" }}
              >
                <div>{name}</div>
              </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    {des}
                    <div>
                      <img
                        src={img}
                        alt="none"
                        style={{
                          width: "250px",
                          height: "100px",
                          marginLeft: "auto",
                        }}
                      />
                    </div>
                    {arr.map((item, index) => {
                      return (
                        <>
                          <Container>
                            {" "}
                            <Row xs={2} md={4}>
                              <Col>
                                <input
                                  type="text"
                                  value={item.name}
                                  style={{
                                    marginTop: "10px",
                                    paddingRight: "-10px",
                                  }}
                                />
                              </Col>
                              <Col>
                                <div
                                  style={{
                                    marginTop: "12.3px",
                                    marginRight: "10px",
                                  }}
                                >
                                  <p value={item.number}>
                                    -------{item.number}
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </>
                      );
                    })}
                  </Col>
                  <Col>
                    <NavDropdown title="Manage Recipe" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={handleShoppingList}>
                        To shopping List
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleEditModal}>
                        Edit Recip
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleShowDeleteModal}>
                        Delete Recipe
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                    </NavDropdown>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>

            <Button onClick={handleClose}>Close</Button>
          </Modal>
          <Delete
            isShowDeleteModal={isShowDeleteModal}
            setShowDeleteModal={setShowDeleteModal}
            setIsShowDetailMoDal={setIsShowDetailMoDal}
            name={name}
            img={img}
            des={des}
            recipeId={recipeId}
            getRecipe={getRecipe}
          />
          <EditRecipe
            isShowEditModal={isShowEditModal}
            setIsShowDetailMoDal={setIsShowDetailMoDal}
            setIsShowEditMoDal={setIsShowEditMoDal}
            name={name}
            img={img}
            des={des}
            recipeId={recipeId}
            arr={arr}
            setArr={setArr}
            getRecipe={getRecipe}
          />
        </>
      ) : (
        <>
          {/* <ShoppingList arr={arr} recipeId={recipeId} /> */}
          nono
        </>
      )}
    </>
  );
};

export default DetailRecipe;
