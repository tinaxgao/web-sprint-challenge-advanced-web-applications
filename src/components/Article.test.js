import React from "react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";

import Article from "./Article";
import { render, screen } from "@testing-library/react";
import axiosWithAuth from "../utils/axiosWithAuth";

const articletest = {
  id: "testid",
  headline: "testheadline",
  author: "testauthor",
  summary: "testsummary",
  body: "testbody",
  image: "testimg",
};

const articleNoAuth = {
  id: "testid",
  headline: "testheadline",
  author: "",
  summary: "testsummary",
  body: "testbody",
  image: "testimg",
};

test("renders component without errors", () => {
  render(
    <Article
      key={articletest.id}
      article={articletest}
      handleDelete={null}
      handleEditSelect={null}
    />
  );
});

test("renders headline, author from the article when passed in through props", () => {
  render(
    <Article
      key={articletest.id}
      article={articletest}
      handleDelete={null}
      handleEditSelect={null}
    />
  );

  const testedHeadline = screen.queryByText(/testheadline/i);
  const testedAuthor = screen.queryByText(/testauthor/i);

  expect(testedHeadline).toBeInTheDocument();
  expect(testedAuthor).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', () => {
  render(
    <Article
      key={articleNoAuth.id}
      article={articleNoAuth}
      handleDelete={null}
      handleEditSelect={null}
    />
  );

  const defaultAuthor = screen.getByText(/Associated Press/i);

  expect(defaultAuthor).toBeInTheDocument();
});

test("executes handleDelete when the delete button is pressed", () => {
  const handleDelete = jest.fn((id) => {
    axiosWithAuth()
      .delete(`/articles/${id}`)
      .then((resp) => {
        setArticles(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  render(
    <Article
      key={articletest.id}
      article={articletest}
      handleDelete={handleDelete}
      handleEditSelect={null}
    />
  );

  const button = screen.getByTestId("deleteButton");
  const testedHeadline = screen.queryByText(/testheadline/i);
  userEvent.click(button);

  expect(handleDelete).toBeCalled();
  expect(testedHeadline).not.toBeInTheDocument();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
