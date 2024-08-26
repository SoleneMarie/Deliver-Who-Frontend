import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliver-oo--dk2vmt6fnyjp.code.run/"
        );
        setData(response.data);
        setisLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.reponse);
      }
    };
    getData();
  }, []);
  return (
    <>
      {isLoading ? (
        <span>🐛En cours de chargement...🐛</span>
      ) : (
        <>
          <h1></h1>
        </>
      )}
    </>
  );
}

export default App;
