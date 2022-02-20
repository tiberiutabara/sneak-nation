import { useState } from 'react'
import { db } from '../../firebase/config'
import { collection, addDoc } from 'firebase/firestore'

// styles 
import './AdminForm.scss'

export default function AdminForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [featured, setFeatured] = useState(false);
  const [colour, setColour] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ref = collection(db, "products");

    await addDoc(ref, {
      title: title,
      price: price,
      "img-url": image,
      featured: featured,
      description: description,
      colour: colour,
    });

    setTitle("");
    setPrice("");
    setImage("");
    setFeatured(false);
    setColour("");
    setDescription("");
  };

  // getting boolean value

  const toBoolean = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span> Product title: </span>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </label>

      <label>
        <span> Price: </span>
        <input
          required
          type="number"
          onChange={(e) => setPrice(parseInt(e.target.value))}
          value={price}
        />
      </label>

      <label>
        <span> Image URL: </span>
        <input
          required
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
      </label>

      <label>
        <span> Is the product featured? </span>
        <select
          required
          onChange={(e) => setFeatured(toBoolean(e.target.value))}
          value={featured}
        >
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
      </label>

      <label>
        <span> Colour: </span>
        <input
          required
          type="text"
          onChange={(e) => setColour(e.target.value)}
          value={colour}
        />
      </label>

      <label>
        <span> Description: </span>
        <textarea
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
      </label>

      <button>Add Product</button>
    </form>
  );
}