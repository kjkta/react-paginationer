// @flow
import * as React from "react";

class Pagination extends React.Component<
  {
    items: Array<*>,
    children: ({
      currentPageItems: Array<*>,
      currentPageNumber: number,
      totalPagesCount: number,
      hasNextPage: boolean,
      hasPrevPage: boolean,
      goToNextPage: () => void,
      goToPrevPage: () => void,
      listEmpty: boolean
    }) => React.Element<*>,
    itemsPerPage: number,
    defaultPage: number
  },
  {
    currentPageIndex: number
  }
> {
  static defaultProps = {
    items: [],
    itemsPerPage: 10,
    defaultPage: 1
  };
  state = {
    currentPageIndex: this.props.defaultPage - 1
  };
  getPages() {
    const pages = this.props.items.reduce((paginatedItems, item, index) => {
      const chunkIndex = Math.floor(index / this.props.itemsPerPage);
      if (!paginatedItems[chunkIndex]) {
        paginatedItems[chunkIndex] = [];
      }
      paginatedItems[chunkIndex].push(item);
      return paginatedItems;
    }, []);
    return pages;
  }
  getPageItems(pageNo: number) {
    return this.getPages()[pageNo];
  }
  movePages(qty: number) {
    this.setState(({ currentPageIndex }) => ({
      currentPageIndex: currentPageIndex + qty
    }));
  }
  getChildrenProps() {
    return {
      currentPageItems: this.getPageItems(this.state.currentPageIndex),
      currentPageNumber: this.state.currentPageIndex + 1,
      totalPagesCount: this.getPages().length,
      hasNextPage: this.getPages().length > this.state.currentPageIndex + 1,
      hasPrevPage: this.state.currentPageIndex - 1 >= 0,
      goToNextPage: () => this.movePages(1),
      goToPrevPage: () => this.movePages(-1),
      listEmpty: this.props.items.length <= 0
    };
  }
  render() {
    if (this.props.children && typeof this.props.children === "function") {
      return this.props.children(this.getChildrenProps());
    } else {
      // eslint-disable-next-line no-console
      console.error(
        "You have not provided a function as children to Paginator"
      );
      return null;
    }
  }
}

export default Pagination;
