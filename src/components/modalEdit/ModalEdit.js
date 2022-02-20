import { db } from '../../firebase/config'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'

// styles 
import './ModalEdit.scss'

export default function ModalEdit({ docId }) {
  // state values
  const [product, setProduct] = useState({});
  const docRefVal = doc(db, "products", docId);

  useEffect(() => {
    getDoc(docRefVal).then((doc) => {
      if (doc.exists()) {
        setProduct(doc.data());
      }
    });
  }, [docId]);

  useEffect(() => {
    setNewTitle(product.title);
    setNewPrice(product.price);
    setNewImage(product["img-url"]);
    setNewFeatured(product.featured);
    setNewColour(product.colour);
    setNewDescription(product.description);
  }, [product]);

  // states
  const [modal, setModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newFeatured, setNewFeatured] = useState(false);
  const [newColour, setNewColour] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // modal
  const toggleModal = () => {
    setModal(!modal);
  };

  // getting boolean value

  const toBoolean = (value) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  // update
  const handleSubmit = (e) => {
    e.preventDefault();

    const docRef = doc(db, "products", docId);

    updateDoc(docRef, {
      title: newTitle,
      price: newPrice,
      "img-url": newImage,
      featured: newFeatured,
      colour: newColour,
      description: newDescription,
    });

    setModal(!modal);
  };

  return (
    <>
      <button onClick={toggleModal}>Edit</button>

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <label>
                <span> New title: </span>
                <input
                  required
                  type="text"
                  onChange={(e) => setNewTitle(e.target.value)}
                  value={newTitle}
                />
              </label>

              <label>
                <span> New Price: </span>
                <input
                  required
                  type="number"
                  onChange={(e) => setNewPrice(parseInt(e.target.value))}
                  value={newPrice}
                />
              </label>

              <label>
                <span> New Image URL: </span>
                <input
                  required
                  type="text"
                  onChange={(e) => setNewImage(e.target.value)}
                  value={newImage}
                />
              </label>

              <label>
                <span> Is the product featured? </span>
                <select
                  required
                  onChange={(e) => setNewFeatured(toBoolean(e.target.value))}
                  value={newFeatured}
                >
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </label>

              <label>
                <span> New Colour: </span>
                <input
                  required
                  type="text"
                  onChange={(e) => setNewColour(e.target.value)}
                  value={newColour}
                />
              </label>

              <label>
                <span> New Description: </span>
                <textarea
                  required
                  onChange={(e) => setNewDescription(e.target.value)}
                  value={newDescription}
                ></textarea>
              </label>

              <button>Update</button>
            </form>

            <button onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}