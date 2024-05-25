import { imageLinks } from "@/constants/ImageLinks";
// pick one raandom image
export const getRandomImage = () => {
  const randomIndex = Math.floor(Math.random() * imageLinks.length);
  return imageLinks[randomIndex];
};