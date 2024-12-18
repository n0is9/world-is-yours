import { useSearchParams } from 'react-router-dom';

export default function Pagination({ totalPages, page }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // navigate(`?category=${category}&page=1`);

  const handleSetPage = (value) => {
    searchParams.set('page', value);
    setSearchParams(searchParams);
  };

  const renderPages = () => {
    const pages = [];
    const visiblePageCount = 1;

    if (page >= 1) {
      pages.push(
        <button
          type="button"
          onClick={() => handleSetPage(1)}
          key={1}
          className={`text-xl font-sans mr-[20px] ${page === 1 ? 'text-black' : 'text-gray'}`}
        >
          1
        </button>,
      );
    }

    if (page > visiblePageCount + 2) {
      pages.push(
        <span key="ellipsis1" className="text-xl font-sans text-gray mr-[20px] max-w-[11px] ">
          ...
        </span>,
      );
    }

    for (
      let i = Math.max(2, page - visiblePageCount);
      i <= Math.min(totalPages - 1, page + visiblePageCount);
      i++
    ) {
      pages.push(
        <button
          type="button"
          onClick={() => handleSetPage(i)}
          key={i}
          className={`text-xl font-sans mr-[20px] ${page === i ? 'text-black' : 'text-gray'}`}
        >
          {i}
        </button>,
      );
    }

    if (page < totalPages - 2) {
      pages.push(
        <span key="ellipsis2" className="text-xl font-sans text-gray mr-[20px] max-w-[11px]">
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          type="button"
          onClick={() => handleSetPage(totalPages)}
          key={totalPages}
          className={`text-xl font-sans ${totalPages === page ? 'text-black' : 'text-gray'}`}
        >
          {totalPages}
        </button>,
      );
    }

    // console.log(pages);

    return pages;
  };

  return <div className="mx-[100px] flex justify-between ">{renderPages()}</div>;
}
