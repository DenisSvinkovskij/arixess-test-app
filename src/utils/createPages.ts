export function createPages(
  pages: number[],
  pagesCount: number,
  currentPage: number,
) {
  if (pagesCount > 5) {
    if (currentPage > 3) {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    } else {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
        if (i === pagesCount) break;
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
  }
}
