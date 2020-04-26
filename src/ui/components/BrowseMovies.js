import React, { useState } from "react";
import categories from "../data/categories.json";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BrowseMovies = () => {
  const [selectedCategories, setSelectedCategories] = useState("genres");

  const handleSelectChange = (e) => void setSelectedCategories(e.target.value);

  return (
    <Container>
      Browse movies by:
      <select onChange={handleSelectChange}>
        {Object.keys(categories).map((category, i) => (
          <option value={category} key={i}>
            {category}
          </option>
        ))}
      </select>
      <ul>
        {categories[selectedCategories].map((cat, i) => {
          const { type, name, payload, sub } = cat;

          return (
            <Link
              key={i}
              style={{ color: "#000" }}
              to={{
                pathname: `/category/${type}/${name}`,
                state: {
                  payload,
                },
              }}
            >
              <CategoryCard>
                {name} {sub && <sub>{sub}</sub>}
              </CategoryCard>
            </Link>
          );
        })}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  > select {
    display: block;
    margin: 5px auto;
  }
  > ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const CategoryCard = styled.li`
  font-size: 1.4em;
  min-width: 270px;
  height: 4em;
  margin: 1em ;
  border-radius: 5px;
  background: linear-gradient(
    0deg,
    rgba(244, 115, 23, 1) 0%,
    rgba(210, 185, 53, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-family: 'Archivo Narrow', sans-serif;
  box-shadow: 1px 3px 6px 3px rgb(0 0 0 /0.3);
  transition: all 0.1s;
  &:hover {
    box-shadow: 1px 2px 3px 2px rgb(0 0 0 /0.4);
    transform: scale(1.05);
    transition: all 0.2s;
  }
`;

export default BrowseMovies;
