import React, { useState, useEffect } from "react";
import DataProvider, { useData } from "./DataProvider";

export default function Checkout() {
  const data = useData();
  const [prices, setPrices] = useState<{ [title: string]: number }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);

  useEffect(() => {
    if (data?.status === "loaded" && data?.basket) {
      const initialPrices: { [title: string]: number } = {};
      data?.basket.forEach((item) => {
        initialPrices[item.title] = 0;
      });
      setPrices(initialPrices);
    }
    console.log(data?.basket)
  }, [data?.basket, data?.status]);

  useEffect(() => {
    let total = 0;
    if (data?.basket) {
      data?.basket.forEach((item) => {
        total += prices[item.title] || 0;
      });
    }
    setTotalPrice(total);
  }, [prices, data?.basket]);

  const handlePriceChange = (title: string, price: number) => {
    setPrices({ ...prices, [title]: price });
  };

  const handleRemoveItem = (title: string) => {
    data?.removeBasketData(title);
    setPrices((prevPrices) => {
      const newPrices = { ...prevPrices };
      delete newPrices[title];
      return newPrices;
    });
  };

  const handleCheckout = () => {
    setShowQRCode(true);
  };

  const closeQRCode = () => {
    setShowQRCode(false);
  };

  if (data?.status === "loading") {
    return <div>Loading...</div>;
  }

  if (data?.status === "error") {
    return <div>Error loading data.</div>;
  }

  return (
    <DataProvider>
      <div className="w-screen h-screen bg-gray-700 flex flex-col items-center">
        <h1 className="text-3xl text-white font-bold mt-10">Checkout</h1>
        <div className="mt-5 w-3/4 max-w-2xl bg-gray-600 p-5 rounded-lg">
          {data?.basket && data?.basket.length > 0 ? (
            <>
              <ul className="space-y-3">
                {data?.basket.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center justify-between bg-gray-500 p-3 rounded-md"
                  >
                    <span className="text-white">{item.title}</span>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        className="w-24 px-2 py-1 rounded-md text-black"
                        value={prices[item.title] || 0}
                        onChange={(e) =>
                          handlePriceChange(item.title, Number(e.target.value))
                        }
                      />
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                        onClick={() => handleRemoveItem(item.title)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex justify-between items-center">
                <span className="text-white font-bold">Total:</span>
                <span className="text-white font-bold">{totalPrice}</span>
              </div>
              <button
                className="mt-5 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </>
          ) : (
            <p className="text-white">Your basket is empty.</p>
          )}
        </div>

        {showQRCode && (
          <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg">
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"></img>
              <p className="mt-3 text-center">Scan to Checkout</p>
              <button
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={closeQRCode}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </DataProvider>
  );
}