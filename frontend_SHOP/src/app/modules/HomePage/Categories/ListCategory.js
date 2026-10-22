import React, { useEffect, useState } from "react";
import CategoryItem from "./CategoryItem";
import { useDispatch, useSelector } from "react-redux";
import { handleGetAllCategory } from "../../../../store/category/handleCategory";
import { sortByQuantityProduct } from "../../../../utils/functions";
import { Link } from "react-router-dom";

const ListCategory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(handleGetAllCategory());
  }, [dispatch]);

  const { dataAllCategory } = useSelector((state) => state.category);

  const sortDataAllCategory = sortByQuantityProduct(
    Array.isArray(dataAllCategory?.results) ? dataAllCategory.results : [],
    true
  );

  return (
    <div className="grid grid-cols-5 gap-x-4 ">
      {sortDataAllCategory?.length > 0 &&
        sortDataAllCategory.slice(0, 5).map((category) => (
          <Link to={`/shopping/${category.id}`} key={category.id}>
            <CategoryItem data={category}></CategoryItem>
          </Link>
        ))}
    </div>
  );
};

export default ListCategory;
