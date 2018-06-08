## Install

`yarn add react-paginationer`

## Use

```js
import Pagination from "react-paginationer";

<Pagination items={props.articles} itemsPerPage={10}>
  {({
    currentPageItems,
    currentPageNumber,
    totalPagesCount,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage
  }) => {
    return (
      // Your UI
    );
  }}
</Pagination>
```