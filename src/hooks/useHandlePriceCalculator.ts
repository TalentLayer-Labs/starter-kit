import { useEffect, useState } from "react";
import useMintFee from "./useMintFee";


export const useHandlePriceCalculator = ({ handle }: { handle: string }) => {
    const [price, setPrice] = useState(0);
    const { mintFee, shortHandlesMaxPrice } = useMintFee();
  
    useEffect(() => {
      const length = handle.length;
      const newPrice = length > 4 ? mintFee : shortHandlesMaxPrice / Math.pow(2, handle.length - 1);
      setPrice(newPrice);
    }, [handle, mintFee, shortHandlesMaxPrice]);
    return price;
  }