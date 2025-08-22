// App.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../src/App";

// mock global fetch
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]), // retorna array vazio
    })
  );
});

afterAll(() => {
  global.fetch.mockRestore();
});

describe("App component", () => {
  it("renderiza Navbar, ListaLembretes e Footer", async () => {
    render(<App />);

    // Navbar (navigation)
    expect(await screen.findByRole("navigation")).toBeInTheDocument();

    // ListaLembretes (main)
    expect(await screen.findByRole("main")).toBeInTheDocument();

    // Footer (contentinfo)
    expect(await screen.findByRole("contentinfo")).toBeInTheDocument();
  });
});
