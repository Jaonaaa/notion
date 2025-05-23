import { useParams } from "react-router-dom";
import ImagePreview from "../components/comment/image-preview";
import { useEffect, useState } from "react";
import { getStoryById } from "../queries/stories";
import { base_url } from "../queries";

export function AddComment() {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    getStoryById(id).then((response) => {
      if (response.image_comment) {
        setImage(`${base_url}${response.image_comment}`);
      }
    });
  }, [id]);

  return <ImagePreview imageUrl={image} idStory={id} />;
}
