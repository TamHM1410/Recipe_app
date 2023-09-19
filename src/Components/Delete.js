import { useEffect, useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { deleteRecipe } from "../Services/RecipeService";

import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { Context } from "../Context/Context.js";
import { useContext } from "react";

const Delete = (props) => {
  const {
    isShowDeleteModal,
    setShowDeleteModal,
    setIsShowDetailMoDal,
    name,
    img,
    des,
    getRecipe,
  } = props;

  const { id } = useContext(Context);
  const handleClose = () => {
    setShowDeleteModal(false);
    setIsShowDetailMoDal(true);
  };
  const handleSubmit = async () => {
    await deleteRecipe(id);
    await getRecipe();

    setShowDeleteModal(false);

    toast.success("delete success");
  };

  return (
    <>
      <Modal show={isShowDeleteModal}>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Delete Recipe</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" value={name} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Img Url</Form.Label>
                  <Form.Control type="img" value={img} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="des" value={des} />
                </Form.Group>

                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="danger" onClick={handleSubmit}>
                    Confirm
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
export default Delete;
