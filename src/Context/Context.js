import React from "react";
import { useState } from "react";

export const Context = React.createContext();

export const ShopContext = ({ children }) => {
  const [arrContext, setArr] = useState([]);
  const [id, setIdContext] = useState();
  const [name, setNameContext] = useState();
  const [des, setDesContext] = useState();
  const [img, setImgContext] = useState();
  const [listRecipe, setListRecipe] = useState();

  const ArrContext = (array) => {
    setArr(array);
  };

  const IdContext = (id) => {
    setIdContext(id);
  };
  const NameContext = (name) => {
    setNameContext(name);
  };
  const DesContext = (des) => {
    setDesContext(des);
  };
  const ImgContext = (img) => {
    setImgContext(img);
  };
  const ListRecipeContext = (value) => {
    setListRecipe(value);
  };
  return (
    <Context.Provider
      value={{
        ArrContext,
        IdContext,
        NameContext,
        DesContext,
        ImgContext,
        ListRecipeContext,
        listRecipe,
        img,
        des,

        name,
        arrContext,
        id,
      }}
    >
      {children}
    </Context.Provider>
  );
};
