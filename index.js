// @flow
import * as React from "react"

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
      goToPrevPage: () => void
    }) => React.Element<*>,
    itemsPerPage: number,
    defaultPage: number
  },
  {
    currentPageIndex: number
  }
> {
  static defaultProps = {
    itemsPerPage: 10,
    defaultPage: 0
  };
  state = {
    currentPageIndex: this.props.defaultPage
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
  render() {
    return this.props.children({
      currentPageItems: this.getPageItems(this.state.currentPageIndex),
      currentPageNumber: this.state.currentPageIndex + 1,
      totalPagesCount: this.getPages().length,
      hasNextPage: this.getPages().length > this.state.currentPageIndex + 1,
      hasPrevPage: this.state.currentPageIndex - 1 >= 0,
      goToNextPage: () => this.movePages(1),
      goToPrevPage: () => this.movePages(-1)
    });
  }
}

export default Pagination