import * as React from "react";
import renderer from "react-test-renderer";
import Pagination from "../react_paginationer";

let list = ["a", "b", "c", "d"];

function createInstance(props) {
  return renderer.create(<Pagination {...props} />).getInstance();
}

beforeEach(() => {
  console.error = () => {};
});

describe("The Paginationer component", () => {
  it("returns null if children is not a function", () => {
    expect(createInstance({}).render()).toBe(null);
  });
  it("returns empty pages list if items length is 0", () => {
    expect(createInstance({ items: [] }).getPages().length).toBe(
      0
    );
  });
  it("generates pages when given a list of items", () => {
    expect(createInstance({ items: list }).getPages().length).toBeGreaterThan(
      0
    );
  });
  it("generates items for the current page", () => {
    expect(
      createInstance({ items: list }).getPageItems(0).length
    ).toBeGreaterThan(0);
  });
  it("generates pages with a custom page length", () => {
    expect(
      createInstance({ items: list, itemsPerPage: 2 }).getPages().length
    ).toEqual(2);
  });
  it("sets a default page", () => {
    expect(
      createInstance({ items: list, defaultPage: 2 }).state.currentPageIndex
    ).toEqual(1);
  });
  it("goes forward and back pages", () => {
    const instance = createInstance({ items: list, itemsPerPage: 2 });
    instance.movePages(1);
    expect(instance.state.currentPageIndex).toEqual(1);
    instance.movePages(-1);
    expect(instance.state.currentPageIndex).toEqual(0);
  });
  it("generates children props", () => {
    expect(
      Object.keys(createInstance({ items: list }).getChildrenProps()).sort()
    ).toEqual(
      [
        "currentPageItems",
        "currentPageNumber",
        "totalPagesCount",
        "hasNextPage",
        "hasPrevPage",
        "goToNextPage",
        "goToPrevPage",
        "listEmpty"
      ].sort()
    );
  });
});
