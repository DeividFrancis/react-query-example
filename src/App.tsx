import { useEffect, useState } from "react";

import "./App.css";
import { Header } from "./Header";

interface IRepo {
  id: number;
  name: string;
  description: string;
  // demais atributos omitidos
}

function App() {
  const [repos, setRepos] = useState<IRepo[]>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    fetchReposInit();
  }, []);

  async function fetchReposInit() {
    try {
      setErrorMessage(undefined);
      setLoading(true);
      const reposResponse = await fetchReposApi();
      setRepos(reposResponse);
    } catch (error) {
      console.log("Error");
      setRepos(undefined);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchReposApi() {
    await delay(2000); // Simular uma requisição lenta;
    const res = await fetch("https://api.github.com/users/deividfrancis/repos");
    if (!res.ok) {
      throw await res.json();
    }
    const json = await res.json();
    return json;
  }
  return (
    <div className="App">
      <Header />
      <div>
        {errorMessage && <strong className="error">{errorMessage}</strong>}
        {loading && <p>Loading...</p>}

        {repos && (
          <ul className="card-list">
            {repos.map((repo) => (
              <li key={repo.id} className="card">
                <h3 className="card-title">{repo.name}</h3>
                <strong className="card-description">{repo.description}</strong>
              </li>
            ))}
          </ul>
        )}
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
