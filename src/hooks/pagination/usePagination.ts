import { useEffect, useState } from "react";

export interface Page {
  length: number;
  current: number;
  listLength: number;
}

export const initPageData: Page = {
  length: 1,
  current: 1,
  listLength: 11,
};

export default function usePagination(data: any[], listLength = 11) {
  const [page, setPage] = useState<Page>(initPageData);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    console.log("Data: ", data);

    setPage({
      ...page,
      length: Math.ceil(data.length / listLength) || 0,
      listLength,
    });
  }, [data, listLength]);

  useEffect(() => {
    const firstData = (page.current - 1) * page.listLength;
    const lastData = firstData + page.listLength;
    
    console.log("First data: ", firstData);
    console.log("Data length: ", data.length);

    if (firstData <= data.length) {
      setList(data.slice(firstData, lastData));
    }

    console.log("Set page");
  }, [page]);

  function updatePage(pageNumber: number) {
    setPage({
      ...page,
      current: pageNumber,
    });
  }

  return {
    list,
    page,
    pageActions: {
      nextPage: () => updatePage(page.current + 1),
      prevPage: () => updatePage(page.current - 1),
    },
  };
}
