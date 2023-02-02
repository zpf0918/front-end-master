import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../fetch/fetchPet";
import Carousel from "../compontents/Carousel";
import ErrorBoundary from "../compontents/ErrorBoundary";
import Modal from "../compontents/Modal";
import AdoptedPetContext from "../context/AdoptedPetConcext";

const Detail = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);
  const navigate = useNavigate();
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>

      {showModal ? (
        <Modal>
          <h1>Would you like to adopt {pet.name}?</h1>
          <div className="buttons">
            <button
              onClick={() => {
                setAdoptedPet(pet);
                navigate("/");
              }}
            >
              Yes
            </button>
            <button onClick={() => setShowModal(false)}>No</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

function DetailErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Detail {...props} />
    </ErrorBoundary>
  );
}

export default DetailErrorBoundary;
