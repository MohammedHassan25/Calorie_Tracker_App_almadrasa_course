import { Link } from "react-router-dom";

const STYLE = { textAlign: "center" }

export function LandingPage() {
  return (
    <>
      <h1>Welcome to CALORIE TRACKER</h1>
      <h2 style={STYLE}>
        TO Get Started, <Link to="track">Start Tracking</Link>
      </h2>
    </>
  );
}
