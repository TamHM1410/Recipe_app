import axios from "./CustomAxios";
const createNewRecipe = (name, url, description, arr) => {
  if (arr) {
    return axios.post("/recipe_app", {
      name,
      url,
      description,
      arr,
    });
  } else {
    return axios.post("/recipe_app", {
      name,
      url,
      description,
    });
  }
};
const updateRecipe = (name, url, description, arr, id) => {
  return axios.put(`/recipe_app/${id}`, {
    name,
    url,
    description,
    arr,
  });
};
const getAllRecipe = () => {
  return axios.get("/recipe_app");
};
const getRecipeById = (id) => {
  return axios.get(`/recipe_app/${id}`, id);
};
const deleteRecipe = (id) => {
  console.log("id", id);
  return axios.delete(`/recipe_app/${id}`, { id });
};

export {
  createNewRecipe,
  getAllRecipe,
  getRecipeById,
  deleteRecipe,
  updateRecipe,
};
