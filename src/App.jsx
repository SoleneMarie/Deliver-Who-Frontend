import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import deliverooLogoComplet from "./pictures/SVG/logo-teal.svg";

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
  console.log(data);
  return (
    <>
      {isLoading ? (
        <span>🐛En cours de chargement...🐛</span>
      ) : (
        <>
          <header>
            <section className="line">
              <div className="band">
                <img
                  className="logo"
                  src={deliverooLogoComplet}
                  alt="logo deliveroo"
                />
              </div>
            </section>

            <section id="flexheader">
              <section className="mainHeader">
                <h1>{data.restaurant.name}</h1>
                <p>{data.restaurant.description}</p>
              </section>

              <img id="banner-pic" src={data.restaurant.picture} />
            </section>
          </header>
          {/* ---------------------CSS terminé jusque là ---------------- */}
          <main>
            <div className="mainblock">
              <section id="allcategories">
                {data.categories.map((elem, index) => {
                  if (elem.meals.length !== 0) {
                    return (
                      <>
                        <h2 key={index}> {elem.name}</h2>

                        <section className="oneCategory">
                          {elem.meals.map((elemBis, index) => {
                            return (
                              <>
                                <section key={index} className="contentOnemeal">
                                  <section className="onemeal">
                                    <section className="AllText">
                                      <h3 key="elem.id">{elemBis.title}</h3>
                                      <div className="overflowHidden">
                                        <p>{elemBis.description}</p>
                                      </div>
                                      <div className="priceandpop">
                                        <span className="moyen">
                                          {elemBis.price} €
                                        </span>
                                        {elemBis.popular && (
                                          <div className="pop">
                                            <div>
                                              <FaStar />
                                            </div>
                                            <div>
                                              <p className="petit">Populaire</p>
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                    </section>
                                    {elemBis.picture && (
                                      <img
                                        src={elemBis.picture}
                                        alt={elemBis.title}
                                      />
                                    )}
                                  </section>
                                </section>
                              </>
                            );
                          })}
                        </section>
                      </>
                    );
                  }
                })}
              </section>
              <section className="Panier">
                <div className="boxshadow">
                  <div className="buttonclass">
                    <button>Valider mon panier</button>
                  </div>
                  <div className="basket">
                    <span>Votre panier est vide</span>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
