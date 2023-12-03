import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeCarsBasket,
  incrementCarsBasket,
  decrementCarsBasket,
} from "../redux/features/carSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { carsBasket } = useSelector((state) => state.car);
  const totalCount = carsBasket.reduce((acc, curr) => acc + curr.count, 0);
  const totalAmount = carsBasket.reduce(
    (acc, curr) => acc + curr.price * curr.count,
    0
  );
  const [basket, setBasket] = useState(false);

  return (
    <main className="flex items-center justify-around py-20 container mx-auto bg-violet-950 mb-10">
      <nav>
        <h2 className="text-4xl font-bold text-white">Logo</h2>
      </nav>
      <div className="relative">
        <nav
          className="relative cursor-pointer"
          onClick={() => setBasket(!basket)}
        >
          <i className="fa-solid fa-shopping-cart text-4xl text-white"></i>
          <span className="absolute top-[-10px] right-[-10px] flex bg-violet-100 text-black font-bold text-md items-center justify-center w-6 h-6 rounded-full border-[1px] border-white ">
            {totalCount}
          </span>
        </nav>
        {basket && (
          <div className="absolute top-10 right-0 w-[400px] h-[588px] p-2 bg-violet-200 flex flex-col ">
            <nav>
              <h2>Total Count:{totalCount}</h2>
              <h2>Total Amount:{totalAmount}</h2>
            </nav>
            {carsBasket.map((car) => (
              <div
                key={car.id}
                className="flex  gap-10  pb-2 bg-violet-400 border-b-2 border-black mb-2"
              >
                <img
                  src={`../public/img/${car.img}`}
                  alt=""
                  className="w-20 h-20"
                />
                <nav className="flex flex-wrap gap-2">
                  <h2 className="ml-2 text-2xl font-bold text-red-800">
                    Marka: {car.title}
                  </h2>
                  <span className="ml-2 text-xl font-semibold">
                    Year: {car.year}
                  </span>
                  <span className="ml-2 text-xl font-semibold text-green-900">
                    Price: {car.price}
                  </span>
                  <nav className="flex gap-4 items-center">
                    <span
                      onClick={() => dispatch(decrementCarsBasket(car.id))}
                      className="text-md font-bold cursor-pointer hover:text-amber-800"
                    >
                      Azalt
                    </span>
                    <span className="ml-2 text-xl font-semibold text-blue-900">
                      Count: {car.count}
                    </span>
                    <span
                      onClick={() => dispatch(incrementCarsBasket(car.id))}
                      className="text-md font-bold cursor-pointer hover:text-amber-800"
                    >
                      Artir
                    </span>
                  </nav>
                  <button
                    className="text-2xl px-2  border-2 border-white rounded-lg font-semibold"
                    onClick={() => dispatch(removeCarsBasket(car.id))}
                  >
                    Remove
                  </button>
                </nav>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Navbar;
