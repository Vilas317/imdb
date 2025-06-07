import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'paginationSlice',
    initialState: {
        pageNo: 1
    },
    reducers: {
        handlePrevious: state => {
            state.pageNo = state.pageNo - 1;
        },
        handleNext: state => {
            state.pageNo = state.pageNo + 1;
        }
    }
})

export default paginationSlice;