import { array } from "prop-types";

export const DOTS = "...";

/*
  Pagination hook designed to satisfy the following conditions:

  1. By default, “15 per page” is selected and you will be on page 1
  2. When user changes “X per page” (the only options will be 15, 25, 50 and 100), 
     it should only display at maximum that amount of blogs per page, and the first page is displayed
  3. When user clicks on the Previous and Next arrow button, it will display it’s respective page results
  4. If the first and last page is the same, then previous and next arrow buttons are disabled
  5. If user at the beginning of the results, the previous button should be disabled
  6. If user at the end of the results, the next button should be disabled
  7. Current page always have 2 siblings.
  8. Ellipses should be inserted if the first page or the last page is not a sibling of the current page
  9. First and last page must always be displayed
  10. There will always be at least 1 blog post

  These conditions were met by performing the following:

  1. Display all pages by default if there are 3 or less pages.
  2. If there are 4 or more pages, checks the following conditions:
    2.1. Given the current page, will there be ellipses on the right side?
    2.2. Will there be ellipses on the left side?
    2.3. Will there be ellipses on both sides?
  3. The result of these conditions isolates 3 possible scenarios.
  4. Design each array based on result of conditions, return the array.
*/

function usePagination({ currentPage, totalPages }) {
  if (totalPages <= 3) {
    return pageRange(firstPage, totalPages);
  }

  if (totalPages > 3) {
    const leftDots = leftDotsRequired(currentPage);
    const rightDots = rightDotsRequired(currentPage, totalPages);
    const leftSibling = currentPage - 1;
    const rightSibling = currentPage +1 ;
    const firstPage = 1;
    let left;
    let right;

    if (rightDots && !leftDots) {
      left = [1, 2, 3];
      right = [DOTS, totalPages];
      return [...left, ...right];
    }

    if (rightDots && leftDots) {
      left = [firstPage, DOTS];
      right = [DOTS, totalPages];
      let center = [leftSibling, currentPage, rightSibling];
      return [...left, ...center, ...right];
    } 

    if (leftDots && !rightDots) {
      left = [firstPage, DOTS];
      right = [totalPages - 2, totalPages - 1, totalPages];
      return [...left, ...right];
    }
  } 
}

const pageRange = (first, last) => {
  let length = last - first + 1;
  return Array.from( {length}, (x, pageNumber) => pageNumber + first);
}

const leftDotsRequired = (current) => {
  return (current > 2);
}

const rightDotsRequired = (current, total) => {
  return (current < total - 1);
}

export default usePagination;
