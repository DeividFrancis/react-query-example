import { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";

import "./App.css";
import { Header } from "./Header";

interface IRepo {
  id: number;
  name: string;
  description: string;
  // demais atributos omitidos
}

function App() {
  const { isLoading, data, error } = useQuery("repos", fetchReposApi);

  async function fetchReposApi() {
    await delay(2000); // Simular uma requisição lenta;
    const res = await fetch("https://api.github.com/users/deividfrancis/repos");
    if (!res.ok) {
      throw await res.text();
    }
    const json = await res.json();
    return json as IRepo[];
  }
  return (
    <div className="App">
      <Header />
      <div>
        <>
          {error && <strong className="error">{JSON.stringify(error)}</strong>}
          {isLoading && <p>Loading...</p>}

          {data && (
            <ul className="card-list">
              {data.map((repo) => (
                <li key={repo.id} className="card">
                  <h3 className="card-title">{repo.name}</h3>
                  <strong className="card-description">
                    {repo.description}
                  </strong>
                </li>
              ))}
            </ul>
          )}
        </>
      </div>
      <p className="read-the-docs">
        Click on the ReactQuery and React logos to learn more
      </p>
    </div>
  );
}

export default App;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
