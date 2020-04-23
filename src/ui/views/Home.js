import React, { useState } from "react";
import categories from "../data/categories.json";
import { Link } from "react-router-dom";

export const Home = () => {
  const [selectedCategories, setSelectedCategories] = useState("genres");

  const handleSelectChange = (e) => void setSelectedCategories(e.target.value);

  return (
    <div>
      <h1>Home content</h1>
      Browse movies by:{" "}
      <select onChange={handleSelectChange}>
        {Object.keys(categories).map((category, i) => (
          <option value={category} key={i}>
            {category}
          </option>
        ))}
      </select>
      {categories[selectedCategories].map((cat, i) => {
        const { type, name, payload } = cat;

        return (
          <Link
            key={i}
            to={{
              pathname: `/category/${type}/${name}`,
              state: {
                payload,
              },
            }}
          >
            <p> {name}</p>
          </Link>
        );
      })}
    </div>
  );
};
