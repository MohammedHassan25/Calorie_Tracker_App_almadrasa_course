import { useNavigateAndCounter } from "@root/hooks";
import { Link } from "react-router-dom";

const STYLE = { textAlign: "center" };
export function ErrorPage() {
  const counter = useNavigateAndCounter(10, "/");
  return (
    <>
      <h1>Something Wrong ...</h1>
      <h4 style={STYLE}>Redirecting to Home Page in {counter}</h4>
      <h4 style={STYLE}>
        OR CLICK <Link to="">HOME</Link> To GO TO BACK
      </h4>
    </>
  );
}
