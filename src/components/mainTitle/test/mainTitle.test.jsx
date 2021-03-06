import { render, screen } from "@testing-library/react";
import MainTitle from "../index";

describe("MainTitle", () => {
  test("renders MainTitle", () => {
    render(<MainTitle />);
    const title = screen.getByRole("heading");
    expect(title).toBeInTheDocument();
  });

  it("Image renders correctly", () => {
    render(<MainTitle />);
    let image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "/images/Artificial-Intelligence-12.webp"
    );
    expect(image).toHaveAttribute("alt", "ai finger and human finger linking");
  });
});
