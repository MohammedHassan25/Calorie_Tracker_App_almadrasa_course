import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export function useNavigateAndCounter(Counter, redirectLink) {
  const [counter, setCounter] = useState(Counter);
  const Interval = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (counter === 0) {
      clearInterval(Interval.current);
      navigate(redirectLink);
    }
  }, [counter, navigate, redirectLink]);

  useEffect(() => {
    Interval.current = setInterval(() => {
      setCounter((e) => e - 1);
    }, 1000);
    return () => clearInterval(Interval.current);
  }, []);

  return counter;

}