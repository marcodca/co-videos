import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FetchMore = ({ cb }) => {
  const observeRef = useRef();

  //This reference is gonna help us avoid to trigger the callback to soon, or to often.
  const isReadyRef = useRef();

  //We create a new function to pass as a callback to the IntObs, this function is gonna check that the waiting time has finished.
  const fn = () => {
    if (!isReadyRef.current) return;
    cb();
  };

  //On first render we start the Intersection Observer, and after set the ready state in the ref after the waiting time;
  useEffect(() => {
    let observer = new IntersectionObserver(fn);
    observer.observe(observeRef.current);
    const timeOut = setTimeout(() => {
      isReadyRef.current = true;
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  return <Container ref={observeRef} />;
};

const Container = styled.div`
  width: 100%;
  height: 7em;
  position: absolute;
  bottom: 0;
  left: 0;
`;

FetchMore.propTypes = { cb: PropTypes.func.isRequired };

export default FetchMore;
