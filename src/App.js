import { ReactComponent as Logo } from "./assets/img/svgs/logo.svg"
import { ReactComponent as Cart } from "./assets/img/svgs/cart.svg"
import mattresses from "./mattresses"
import "./App.scss"
import { useEffect, useRef, useState } from "react"
import CountUp from "react-countup"
import classNames from "classnames"

var mattressesArray = Object.keys(mattresses).map((m) => mattresses[m])

function App() {
  const [selectedMattress, setSelectedMattress] = useState(mattressesArray[0])
  const [cartQuantity, setCartQuantity] = useState(0)
  const { name, price, image, prevPrice } = selectedMattress
  const quantityCircle = useRef(null)

  return (
    <>
      <header className="header">
        <Logo className="logo" />
        <div className="cart-container">
          <Cart className="cart" />
          <div
            ref={quantityCircle}
            onAnimationEnd={({ target }) => {
              target.classList.remove("bounce")
            }}
            className="cart-quantity"
          >
            {cartQuantity}
          </div>
        </div>
      </header>
      <main>
        <section aria-labelledby="cym" className="cym-section">
          <img src={image} className="image" />
          <div role="presentation" className="control-container">
            <h1 id="cym">Choose Your Mattress</h1>
            <div role="radiogroup" aria-labelledby="smt">
              <h2 id="smt">Select Mattress Type</h2>
              {mattressesArray.map(function (mattress) {
                const { name, price } = mattress
                const selected = name === selectedMattress.name && "selected"
                return (
                  <button
                    className={classNames("button-mattress", selected)}
                    role="radio"
                    key={name + price}
                    onClick={() => {
                      setSelectedMattress(function (prev) {
                        return { ...mattress, prevPrice: prev.price }
                      })
                    }}
                  >
                    {name}
                  </button>
                )
              })}
            </div>
            <div className="name-and-price">
              <label>{`${name} Mattress`}</label>
              <CountUp
                className={"price"}
                decimals={2}
                useEasing={true}
                startOnMount={false}
                duration={0.75}
                prefix="$"
                start={prevPrice}
                end={price}
              ></CountUp>
            </div>
            <button
              onClick={() => {
                setCartQuantity((prev) => (prev < 9 ? prev + 1 : "9+"))
                quantityCircle.current.classList.add("bounce")
              }}
              className="button-cart"
            >
              Add To Cart
            </button>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
