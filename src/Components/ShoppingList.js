import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useState, useEffect, useContext } from "react";

import { Context } from "../Context/Context";
import Form from "react-bootstrap/Form";

const ShoppingList = (props) => {
  //State
  const { arrContext, id, ArrContext } = useContext(Context);
  const [currentArr, setCurrentArr] = useState([]);
  const [isValid, setIsValid] = useState(true);

  const [nameInput, setName] = useState();
  const [numberInput, setNumber] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isAddName, setIsAddName] = useState(true);
  const [isAddNum, setIsAddNum] = useState(true);
  const [currentIndex, setCurrentIndex] = useState();

  ////function

  const getShoppingList = async () => {
    setCurrentArr(arrContext);
  };
  const handleEdit = async (index) => {
    setIsEdit(true);

    const editedItem = currentArr[index];

    setCurrentIndex(index);
    setName(editedItem.name);
    setNumber(editedItem.number);
  };
  const UpdateButton = (index, nameInput, numberInput) => {
    const updatedObj = {
      ...currentArr[index],
      name: nameInput,
      number: numberInput,
    };

    const updatedArr = [...currentArr];
    updatedArr[index] = updatedObj;
    setCurrentArr(updatedArr);
    ArrContext(updatedArr);
    setIsEdit(false);
    setName("");
    setNumber("");
  };

  const handleAdd = () => {
    const obj = {
      name: nameInput,
      number: numberInput,
    };
    const fakeArr = [...arrContext];
    const newArr = [];
    let found = false;
    let elseExecuted = false;
    for (let i = 0; i < fakeArr.length; i++) {
      if (fakeArr[i].name === obj.name) {
        fakeArr[i].number = parseInt(obj.number) + parseInt(fakeArr[i].number);
        newArr.push(fakeArr[i]);
        found = true;

        break;
      } else {
        elseExecuted = true;
      }
    }
    if (found === false) {
      fakeArr.push(obj);
    }

    ArrContext(fakeArr);

    setCurrentArr(fakeArr);
    setIsAddName(true);
    setName("");
    setNumber("");
  };
  const clearButton = () => {
    setCurrentArr([]);
    ArrContext([]);

    setName("");
    setNumber("");
    setIsEdit(false);
  };
  const cancleButton = () => {
    setIsEdit(false);
    setIsAddName(true);
    setName("");
    setNumber("");
  };

  const handleDelete = (index) => {
    const updatedArr = [...currentArr];

    updatedArr.splice(index, 1);

    setCurrentArr(updatedArr);
    setIsEdit(false);
    setName("");
    setNumber("");
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    const integerPattern = /^\d+$/;
    setIsValid(
      integerPattern.test(value) && Number(value) > 0 && value !== "0"
    );
    setIsAddNum(false);
  };
  const handleInputName = (e) => {
    if (e.target.value.length === 0) {
      setIsAddName(true);
    } else {
      setIsAddName(false);
    }
    setName(e.target.value);
  };

  ////use Effect
  useEffect(() => {
    getShoppingList();
  }, []);

  return (
    <>
      <Container>
        <Form>
          <Row>
            <Col sm={6}>
              <h6>Name:</h6>
            </Col>
            <Col sm={3}>
              <h6>Amount:</h6>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <input
                style={{ width: "100%" }}
                value={nameInput}
                onChange={(e) => handleInputName(e)}
                placeholder="Name"
              />
            </Col>
            <Col sm={3}>
              <input
                value={numberInput}
                style={{ width: "100%" }}
                onChange={(e) => handleInputChange(e)}
                placeholder="Number"
              />
              {!isValid && (
                <p style={{ color: "red" }}>
                  Please input number && number larger than 0 !
                </p>
              )}
            </Col>
          </Row>

          <Row>
            <Col sm={6}>
              {isEdit == false ? (
                <>
                  {" "}
                  <Button
                    variant="success"
                    style={{ marginTop: "10px" }}
                    onClick={handleAdd}
                    disabled={isAddName}
                  >
                    Add
                  </Button>
                  <Button
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    onClick={clearButton}
                  >
                    Clear
                  </Button>
                  <Button
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    onClick={cancleButton}
                  >
                    Cancle
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="success"
                    style={{
                      marginTop: "10px",

                      marginRight: "5px",
                    }}
                    onClick={() =>
                      UpdateButton(currentIndex, nameInput, numberInput)
                    }
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    style={{ marginTop: "10px", marginRight: "1px" }}
                    onClick={() => handleDelete(currentIndex)}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    onClick={clearButton}
                  >
                    Clear
                  </Button>
                  <Button
                    style={{ marginTop: "10px", marginLeft: "5px" }}
                    onClick={cancleButton}
                  >
                    Cancle
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Form>
        <Table striped bordered hover style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th style={{ width: "70%" }}>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          {currentArr &&
            currentArr.map((item, index) => {
              return (
                <>
                  <tbody>
                    <tr onClick={() => handleEdit(index)} key={index}>
                      <td>{item.name}</td>
                      <td>{item.number}</td>
                    </tr>
                  </tbody>
                </>
              );
            })}
        </Table>
      </Container>
    </>
  );
};
export default ShoppingList;
