import { useDispatch, useSelector } from "react-redux";
import { addToBasket, fetchCarsData } from "../redux/features/carSlice";
import { useEffect } from "react";

function Cars() {
  const dispatch = useDispatch();
  const { carsData } = useSelector((state) => state.car);

  useEffect(() => {
    dispatch(fetchCarsData());
  }, [dispatch]);
  return (
    <main>
      <section className="container mx-auto flex items-center justify-between flex-wrap gap-10">
        {carsData.map((car) => (
          <div
            key={car.id}
            className="flex flex-col justify-between w-[300px]  h-[400px] pb-2 bg-violet-400"
          >
            <img
              src={`../public/img/${car.img}`}
              alt=""
              className="w-full h-2/4"
            />
            <h2 className="ml-2 text-2xl font-bold">Marka: {car.title}</h2>
            <span className="ml-2 text-xl font-semibold">Year: {car.year}</span>
            <span className="ml-2 text-xl font-semibold">
              Price: {car.price}
            </span>
            <button
              onClick={() => dispatch(addToBasket(car))}
              className="self-center text-3xl font-bold border-2 px-3 rounded-lg border-[#dadadad]"
            >
              Add to Basket
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Cars;
