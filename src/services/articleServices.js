import axiosWithAuth from "../utils/axiosWithAuth";
import { useState, useEffect } from "react";

const articleService = () => {
  const [articles, setArticles] = useState([]);

//   useEffect(() => {
    axiosWithAuth()
      .get("/articles")
      .then((resp) => {
        setArticles(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
//   }, []);

  return [articles, setArticles];
};

export default articleService;

//Task List:
//1. Complete articleServices. This module should make an authenticated call and return an array of those articles.
