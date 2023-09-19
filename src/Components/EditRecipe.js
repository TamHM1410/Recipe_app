import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { updateRecipe } from "../Services/RecipeService";
import { Context } from "../Context/Context.js";
import { useContext } from "react";

const EditRecipe = (props) => {
  const {
    setIsShowDetailMoDal,
    setIsShowEditMoDal,

    isShowEditModal,

    setArr,

    arr,
    getRecipe,
  } = props;
  const { img, des, name, ImgContext, NameContext, DesContext, id } =
    useContext(Context);

  const handleClose = () => {
    setIsShowEditMoDal(false);
    setIsShowDetailMoDal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateRecipe(name, img, des, arr, id);
    await getRecipe();
    setIsShowEditMoDal(false);

    toast.success("Updated Success");
    // setIsShowEditMoDal(false);
  };

  const handleIngredientNumberChange = (e, index) => {
    const newArr = [...arr];
    newArr[index] = { ...newArr[index], number: e.target.value };
    setArr(newArr);
  };

  const handleIngredientNameChange = (e, index) => {
    const newArr = [...arr];
    newArr[index] = { ...newArr[index], name: e.target.value };
    setArr(newArr);
  };

  return (
    <>
      <Modal show={isShowEditModal}>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Edit Recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>
                    <h6>Name:</h6>
                  </Form.Label>
                  <Form.Control
                    type="name"
                    value={name}
                    onChange={(e) => NameContext(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <h6>Img Url:</h6>
                  </Form.Label>
                  <Form.Control
                    type="img"
                    value={img}
                    onChange={(e) => ImgContext(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>
                    <h6>Description:</h6>
                  </Form.Label>
                  <Form.Control
                    type="des"
                    value={des}
                    onChange={(e) => DesContext(e.target.value)}
                  />
                </Form.Group>
                <h6>Ingrediant:</h6>
                {arr.map((item, index) => {
                  return (
                    <>
                      <Container>
                        {" "}
                        <Row>
                          <Col>
                            {" "}
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label></Form.Label>
                              <Form.Control
                                type="text"
                                value={item.name}
                                onChange={(e) =>
                                  handleIngredientNameChange(e, index)
                                }
                              />{" "}
                            </Form.Group>
                          </Col>
                          <Col>
                            {" "}
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicPassword"
                            >
                              <Form.Label></Form.Label>
                              <Form.Control
                                type="text"
                                value={item.number}
                                onChange={(e) =>
                                  handleIngredientNumberChange(e, index)
                                }
                                placeholder="number"
                              />{" "}
                            </Form.Group>
                          </Col>
                        </Row>
                      </Container>
                    </>
                  );
                })}

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </div>
      </Modal>
    </>
  );
};

export default EditRecipe;
