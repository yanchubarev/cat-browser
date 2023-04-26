import axios, { AxiosResponse } from "axios";
import { CatBreed, CatImages, CatInfo } from "@/types/cat";
import { CatImageResponse, CatInfoResponse } from "@/types/api";

const BASE_URL = "https://api.thecatapi.com/v1";
const API_KEY =
  "live_AcGXLFbWVBXXraqpz6Ny12RX9dC2Z19OSR7mfHvUiy4F4JsKIgWaszJXVLimajUw";

axios.defaults.headers.common["x-api-key"] = API_KEY;

export class CatService {
  // Method to get a list of cat breeds
  async getBreeds(): Promise<CatBreed[]> {
    try {
      const response: AxiosResponse<CatBreed[]> = await axios.get(
        `${BASE_URL}/breeds`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error while loading breeds");
    }
  }

  // Method to get a list of cat images by breed id, page number, and limit
  async getCatItems(
    breedId: string,
    page: number,
    limit: number
  ): Promise<CatImages> {
    try {
      const response: AxiosResponse<CatImageResponse[]> = await axios.get(
        `${BASE_URL}/images/search?limit=${limit}&page=${page}&breed_id=${breedId}`
      );
      // Transform the response data into a format usable by the application
      const items = response.data.map((item) => {
        return {
          id: item.id,
          image: item.url,
        };
      });
      // Extract the total number of images from the response headers
      const totalImages = parseInt(response.headers["pagination-count"]) || 0;
      return { items, totalImages };
    } catch (error) {
      throw new Error(
        "Apologies but we could not load new cats for you at this time! Miau!"
      );
    }
  }

  // Method to get information about a specific cat by ID
  async getCatById(id: string | string[]): Promise<CatInfo> {
    try {
      const response: AxiosResponse<CatInfoResponse> = await axios.get(
        `${BASE_URL}/images/${id}`
      );
      // Extract the relevant information from the response and return it
      return {
        id: response.data.id,
        origin: response.data.breeds[0].origin,
        name: response.data.breeds[0].name,
        temperament: response.data.breeds[0].temperament,
        description: response.data.breeds[0].description,
        breed: response.data.breeds[0].id,
        image: response.data.url,
      };
    } catch (error) {
      throw new Error("Error while loading breed information");
    }
  }
}
