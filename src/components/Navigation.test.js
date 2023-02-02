import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Navigation from './Navigation.js';
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../services/appApi";

jest.mock("react-redux", () => ({
    useSelector: jest.fn(),
}));

jest.mock("../services/appApi", () => ({
    useLogoutUserMutation: jest.fn(),
}));

describe("Navigation", () => {
    let store;
    let mockStore;
    beforeEach(() => {
        mockStore = configureStore([]);
        store = mockStore({
            user: {
                name: "testuser",
                picture: "testpic.jpg",
            },
        });
    });

    it("should render the navigation bar with the user's name and picture", () => {
        useSelector.mockImplementation((selector) => selector({
            user: {
                name: "testuser",
                picture: "testpic.jpg",
            },
        }));

        const { getByText, getByAltText } = render(
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
        expect(getByText("testuser")).toBeInTheDocument();
        expect(getByAltText("testuser")).toBeInTheDocument();
    });

    it("should render the navigation bar without the user information when there is no user", () => {
        useSelector.mockImplementation((selector) => selector({ user: null }));

        const { getByText } = render(
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
        expect(getByText("Login")).toBeInTheDocument();
    });

    it("should call the logoutUser mutation when the logout button is clicked", async () => {
        const logoutUserMutation = jest.fn();
        useLogoutUserMutation.mockReturnValue([logoutUserMutation]);
        useSelector.mockImplementation((selector) => selector({
            user: {
                name: "testuser",
                picture: "testpic.jpg",
            },
        }));
        console.log(Provider)
        render(
            <Provider store={store}>
                <Navigation />
            </Provider>
        );

        fireEvent.click(screen.getByText("Logout"));

        expect(logoutUserMutation).toHaveBeenCalledWith({
            name: "testuser",
            picture: "testpic.jpg",
        });
    });
});
