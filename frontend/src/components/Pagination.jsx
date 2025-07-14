import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="join">
        <button
          className="join-item btn btn-sm btn-soft"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <button className="join-item btn btn-sm btn-soft">
          Page {currentPage}
        </button>
        <button
          className="join-item btn btn-sm btn-soft"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
