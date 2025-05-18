import { useParams } from "react-router-dom";
import ImagePreview from "../components/comment/image-preview";

export function AddComment() {
  const { id } = useParams();

  return <ImagePreview imageUrl="public/placeholder.svg" idStory={id} />;
}
