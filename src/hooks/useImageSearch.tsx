import toast from "react-hot-toast";
import { UNSPLASH_ACCESS_KEY, UNSPLASH_API_URL } from "../util/environment";
import { useState } from "react";

const useImageSearch = () => {
  const [images, setImages] = useState<string[]>([]);

  async function searchImage(query: string) {
    try {
      let sanitizedQuery = query.replace(/[0-9]/g, '').trim();
      const queryArray = sanitizedQuery.split(' ');
      for(let i = 0; i < queryArray.length; i++) {
        if(queryArray[i] == "g" || queryArray[i] == "kg" || 
        queryArray[i] == "lb" || queryArray[i] == "oz" ||
        queryArray[i] == "cup" || queryArray[i] == "tbsp" ||
        queryArray[i] == "tsp" || queryArray[i] == "ml" ||
        queryArray[i] == "l" || queryArray[i] == "gallon" ||
        queryArray[i] == "pint" || queryArray[i] == "quart"){
          queryArray[i] = "";
        }
      }
      sanitizedQuery = queryArray.join(' ');
      const response = await fetch(
        `${UNSPLASH_API_URL}/search/photos?query=ingredient+${sanitizedQuery}`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Image search error");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setImages(data.results.map((result: any) => result.urls.small).slice(0,3));
    } catch (error) {
      toast.error("We couldn't find any images for that ingredient");
      console.error("Image search error", error);
    }
  }
  return {
    images,
    searchImage,
  }
};

export default useImageSearch;
