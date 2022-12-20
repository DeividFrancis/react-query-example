import reactLogo from "./assets/react.svg";
import reactQueryLogo from "./assets/react-query.svg";

export function Header() {
  return (
    <>
      <div>
        <a href="https://react-query-v3.tanstack.com" target="_blank">
          <img
            src={reactQueryLogo}
            className="logo react"
            alt="React Query logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Query Example</h1>
    </>
  );
}
