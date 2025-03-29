import { useData } from "../DataProvider";

type Props = {
  title: string;
  image: string;
};

export default function Movie({ title, image }: Props) {
  const data = useData()
  
  return (
    <div tabIndex={0} className="w-[240px] pl-5 mt-5 flex flex-col hover:cursor-pointer" onClick={()=>{
      data?.addBasketData(title)
    }}>
      <img src={"https://image.tmdb.org/t/p/w220_and_h330_face" + image} className="w-[220px] h-[330px]"></img>
      <h1 className="w-full text-white font-serif text-ellipsis overflow-hidden">{title}</h1>
    </div>
  );
}
