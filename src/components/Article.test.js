import React from "react";
import "@testing-library/jest-dom";

import userEvent from "@testing-library/user-event";

import Article from "./Article";
import { render, screen } from "@testing-library/react";

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
    />
  );
});

test("renders headline, author from the article when passed in through props", () => {
  render(
    <Article
      key={articletest.id}
      article={articletest}
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
    />
  );

  const defaultAuthor = screen.queryByText(/Associated Press/i);
  expect(defaultAuthor).toBeInTheDocument();
});

test("executes handleDelete when the delete button is pressed", () => {
  const handleDelete = jest.fn();

  render(
    <Article
      key={articletest.id}
      article={articletest}
      handleDelete={handleDelete}
    />
  );

  const button = screen.getByTestId("deleteButton");
  userEvent.click(button);
  expect(handleDelete).toHaveBeenCalled();
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
