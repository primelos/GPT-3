import React, { useState } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBox from "../index";

describe("SearchBox", () => {
  describe("Text Area", () => {
    test("text area should render", () => {
      render(<SearchBox />);
      const textArea = screen.getByRole("textbox");
      expect(textArea).toBeInTheDocument();
    });
  });

  describe("Input Value", () => {
    test("input value should be empty and button disabled", () => {
      render(<SearchBox />);
      const textArea = screen.getByRole("textbox");
      expect(textArea.value).toBe("");
      const submit = screen.getByRole("button");
      expect(submit).toBeDisabled();
      expect(textArea).toHaveAttribute("type", "text");
    });

    test("input typed value and button enabled", async () => {
      const checkEvent = userEvent.setup();
      render(<SearchBox />);
      const textArea = screen.getByRole("textbox");
      const submit = screen.getByRole("button", { name: /submit/i });
      expect(submit).toBeDisabled();
      checkEvent.type(textArea, "Hello");
      await waitFor(() => {
        expect(submit).not.toBeDisabled();
      });
    });
  });
});
// test("after submit input should clear button diabled", () => {
//   const { debug } = render(<SearchBox />);
//   debug();
//   // const input = screen.getByRole("textbox");
//   // const submit = screen.getByRole("button");

//   // input.value = "test";
// })
