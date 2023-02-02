import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";

test("renders navigation bar", () => {
    const { getByText } = render(<Navigation />);
    const loginLink = getByText("Login");
    expect(loginLink).toBeInTheDocument();
});

test("logout button logs out user", async () => {
    const logoutUser = jest.fn();
    const user = { name: "Test User", picture: "test.jpg" };
    const { getByText } = render(<Navigation user={user} logoutUser={logoutUser} />);
    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);
    expect(logoutUser).toHaveBeenCalled();
});
