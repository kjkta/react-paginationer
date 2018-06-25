import * as React from "react";
import renderer from "react-test-renderer";
import Pagination from "../react_paginationer";

let list = ["a", "b", "c", "d"];

function createInstance(props) {
  return renderer.create(<Pagination {...props} />).getInstance();
}

function getInstanceChildrenProps(props) {
  return createInstance(props).getChildrenProps();
}

beforeEach(() => {
  console.error = () => {};
});

describe("The Paginationer component", () => {
  it("gets current page items", () => {
    expect(
      getInstanceChildrenProps({ items: [] }).currentPageItems.length
    ).toBe(0);
    expect(
      getInstanceChildrenProps({ items: list }).currentPageItems.length
    ).toBe(4);
    expect(
      getInstanceChildrenProps({ items: list, itemsPerPage: 2 })
        .currentPageItems.length
    ).toBe(2);
  });
  it("gets current page number", () => {
    expect(getInstanceChildrenProps({ items: list }).currentPageNumber).toBe(1);
    expect(
      getInstanceChildrenProps({ items: list, defaultPage: 4 })
        .currentPageNumber
    ).toBe(4);
  });
  it("gets total pages number", () => {
    expect(getInstanceChildrenProps({ items: list }).totalPagesCount).toBe(1);
    expect(
      getInstanceChildrenProps({ items: list, itemsPerPage: 4 }).totalPagesCount
    ).toBe(1);
  });
  it("checks there is a next page", () => {
    let instance = getInstanceChildrenProps({ items: list, itemsPerPage: 2 });
    expect(instance.hasNextPage).toBe(true);
    expect(instance.hasPrevPage).toBe(false);
  });
  it("checks there is a previous page", () => {
    let instance = getInstanceChildrenProps({
      items: list,
      itemsPerPage: 2,
      defaultPage: 2
    });
    expect(instance.hasNextPage).toBe(false);
    expect(instance.hasPrevPage).toBe(true);
  });
  it("goes forward and back pages", () => {
    const instance = createInstance({ items: list, itemsPerPage: 2 });

    expect(instance.getChildrenProps().hasNextPage).toEqual(true);
    instance.movePages(1);
    expect(instance.state.currentPageIndex).toEqual(1);
    expect(instance.getChildrenProps().hasNextPage).toEqual(false);

    expect(instance.getChildrenProps().hasPrevPage).toEqual(true);
    instance.movePages(-1);
    expect(instance.state.currentPageIndex).toEqual(0);
    expect(instance.getChildrenProps().hasPrevPage).toEqual(false);
  });
});
