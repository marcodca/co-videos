import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import virusImg from "../../assets/virus.svg";
import PropTypes from "prop-types";

const MovieCard = ({ title, picturePath = virus, id, releaseDate = "" }) => {
  const pictureUrl = picturePath
    ? `https://image.tmdb.org/t/p/w500${picturePath}`
    : virusImg;

  return (
    <Container>
      <Link to={`/movie/${id}`} title={title}>
        <h3>{title}</h3>
        <sub>{releaseDate.substring(0, 4)}</sub>
        <img src={pictureUrl} width={280} />{" "}
      </Link>
    </Container>
  );
};

const Container = styled.li`
  display: inline-block;
  width: 40%;
  max-width: 600px;
  min-width: 300px;
  background: linear-gradient(
    0deg,
    rgba(244, 115, 23, 1) 0%,
    rgba(210, 185, 53, 1) 100%
  );
  border-radius: 5px;
  margin: 1em auto;
  box-shadow: 1px 3px 6px 3px rgb(0 0 0 /0.3);
  transition: all 0.1s;
  &:hover {
    box-shadow: 1px 2px 3px 2px rgb(0 0 0 /0.4);
    transform: scale(1.05);
    transition: all 0.2s;
  }
  > a {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > h3 {
      margin: 0;
    }
    > sub {
      color: #000;
    }
    > img {
      max-height: 400px;
      border-radius: 5px;
      margin: auto 0;
    }
  }
`;

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  picturePath: PropTypes.string,
  id: PropTypes.number.isRequired,
  releaseDate: PropTypes.string,
};

export default MovieCard;
