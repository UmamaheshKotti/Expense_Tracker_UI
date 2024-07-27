
import React from "react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const Paginaton = ({ itemesPerPage, totlaItems, setPageNumber, currentPage }) => {
    const totalPages = Math.ceil(totlaItems / itemesPerPage)
    const pageNumbers = [];
    for (var i = 1; i <= Math.ceil(totlaItems / itemesPerPage); i++) {
        pageNumbers.push(i)
    }

    const handlePrevious = () => {
        if(currentPage > 1) {
            setPageNumber(currentPage - 1)
        }
    }

    const handleNext = () => {
        if(currentPage < totalPages ) {
            setPageNumber(currentPage + 1)
        }
    }

    // let paginationRange = 
    return (
        <div className="pagination" >
            <ChevronLeftIcon
                className={ currentPage == 1 ? "chevronleftdisabled" : "chevronleft"}
                onClick={() => handlePrevious() } />
            {/* <button  disabled={currentPage == 1} >Previous</button> */}
            <div>
                <p className="pagination-pages" >Pages {currentPage} of {pageNumbers[pageNumbers.length - 1]}</p>
                {/* {
                    pageNumbers.map((numbers, i) => {
                        return (
                            <p key={i}>Pages {currentPage} of {pageNumbers[pageNumbers.length - 1]}</p>
                        )
                    })
                } */}
            </div>
            <ChevronRightIcon
                className={currentPage === (pageNumbers[pageNumbers.length - 1]) ? "chevronrightdisabled" : "chevronright"}
                onClick={() => handleNext()}
            />
            {/* <button disabled={currentPage === (pageNumbers[pageNumbers.length - 1])} >Next</button> */}
        </div>
    )

}