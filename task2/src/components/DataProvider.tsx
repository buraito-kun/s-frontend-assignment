import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext<{
  basket: {
    title: string;
    price: number;
  }[] | undefined;
  status: "loading" | "loaded" | "error";
  addBasketData: (d: string) => void;
  removeBasketData: (d: string) => void;
} | null>(null);

type Props = PropsWithChildren;

export default function DataProvider({ children }: Props) {
  const [data, setData] = useState<{
    title: string,
    price: number
  }[]>([]);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

    useEffect(() => {
      const fetchRecordData = ()=>{
        if (!data?.length) {
          setData((localStorage.getItem("basket")?.split(",") ?? []).map((v)=>{
            return {
              title: v,
              price: 0
            }
          }))
        }
      }
      fetchRecordData()
      setStatus("loaded");
    }, [status]);

  const addBasketData = (d: string) => {
    if (localStorage.getItem("basket")?.includes(d)) return
    setData([...data, {title: d, price: 0}]);
    localStorage.setItem(
      "basket",
      localStorage.getItem("basket") ? localStorage.getItem("basket") + "," + d : d
    );
  };
  const removeBasketData = (d: string) => {
    setData(data.filter((movie)=>movie.title !== d))
    localStorage.setItem(
      "basket",
      String(localStorage.getItem("basket")?.replace(d, "").replaceAll(",,", ","))
    );
    afterRemove()
  };

  const afterRemove = () => {
    const items = localStorage.getItem("basket")?.split(",").filter(Boolean) || [];

    if (items.length === 0) {
        localStorage.removeItem("basket");
    } else {
        localStorage.setItem("basket", items.join(","));
    }
  };

  return (
    <DataContext.Provider
      value={{
        basket: data,
        status,
        addBasketData,
        removeBasketData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
