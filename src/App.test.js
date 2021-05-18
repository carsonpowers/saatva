import { fireEvent, render, screen } from "@testing-library/react"
import App from "./App"

test('renders "Choose Your Mattress" area', () => {
  render(<App />)
  const text = screen.getByText(/Choose Your Mattress/i)
  expect(text).toBeInTheDocument()
})

test('"add to cart" button click itterates cart quantity', () => {
  const { container } = render(<App />)
  const button = screen.getByText("Add To Cart")
  const cartQuantity = container.querySelector(".cart-quantity")
  fireEvent.click(button)
  fireEvent.click(button)
  fireEvent.click(button)
  expect(cartQuantity.innerHTML).toBe("3")
})
