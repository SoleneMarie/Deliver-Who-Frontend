import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import deliverooLogoComplet from "./pictures/SVG/logo-teal.svg";

function App() {
  const [data, setData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [isPicked, setIsPicked] = useState([]);
  const [plusminus, setPlusminus] = useState([]);
  let [priceTot, setPrice] = useState(0);
  let total1 = (priceTot + 2.5).toFixed(2);
  let total2 = priceTot.toFixed(2);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "https://site--deliver-oo--dk2vmt6fnyjp.code.run/"
        );
        setData(response.data);
        setisLoading(false);
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
                                  {/*-------------------------------ONCLICK---------------------------- */}
                                  <section
                                    className="onemeal"
                                    onClick={(event) => {
                                      event.preventDefault;
                                      const MealsArr = [...isPicked];

                                      MealsArr.push({
                                        key: elemBis.id,
                                        title: elemBis.title,
                                        price: elemBis.price,
                                      });
                                      setPrice(
                                        (priceTot += Number(elemBis.price))
                                      );
                                      setIsPicked(MealsArr);

                                      const Count = [...plusminus];
                                      Count.push({ id: elemBis.id, number: 1 });
                                      setPlusminus(Count);
                                    }}
                                  >
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
                                  {/*-------------------------------ONCLICK---------------------------- */}
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

              {/*--------------------------------PANIER---------------------------------*/}
              <section className="Panier">
                <div className="boxshadow">
                  <div className="buttonclass">
                    <button>Valider mon panier</button>
                  </div>
                  <div className="basket">
                    {isPicked.length !== 0 ? (
                      isPicked.map((item) => {
                        return (
                          <>
                            <section key={item.key} className="basket-line">
                              <button>-</button>
                              <span>1</span>
                              <button>+</button>
                              <span>{item.title}</span>
                              <p>{item.price}</p>
                            </section>
                          </>
                        );
                      })
                    ) : (
                      <span>Votre panier est vide</span>
                    )}
                    {isPicked.length !== 0 && (
                      <section className="total">
                        <div className="sub-tot">
                          <p>Sous-total</p> <p>{priceTot.toFixed(2)} €</p>
                          <p>Frais de livraison</p>
                          {priceTot >= 50 ? (
                            <>
                              <p>Offerts</p>{" "}
                              <div className="finalTot">
                                <p>Total</p>
                                <p>{total2}</p>
                              </div>
                            </>
                          ) : (
                            <>
                              <p>2,50 €</p>
                              <div className="finalTot">
                                <p>Total</p>
                                <p>{total1}</p>
                              </div>
                            </>
                          )}
                        </div>
                      </section>
                    )}
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
