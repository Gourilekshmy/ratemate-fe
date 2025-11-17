import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { updateReview } from "../services/AllApi";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({});

  let { id } = useParams();

//   useEffect(() => {
//     handleEdit();
//   }, []);

  const handleEdit = async () => {
    let token = localStorage.getItem("token");
    let reqheader = { Authorization: `Bearer ${token}` };

    let { company, category, imageUrl, productName, price, comment } =
      reviewDetails;

    try {
      let apiResponse = await updateReview(
        id,
        { company, category, imageUrl, productName, price, comment },
        reqheader
      );
      let data = apiResponse.data;
      setReviewDetails(data);
      console.log(data);
      alert("Successfully Updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <Modal
          className="mx-20"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="bg-blue-400">
            <h1 className="text-2xl font-bold">Edit Review</h1>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-6 mt-3 px-5">
              <input
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    category: e.target.value,
                  })
                }
                // value={reviewDetails.category}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Category "
              />
              <input
                // value={reviewDetails.company}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Company Name"
              />
              <input
                // value={reviewDetails.productName}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Product Name"
              />
              <input
                // value={reviewDetails.price}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Price"
              />
              <input
                value={reviewDetails.imageUrl}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="imageUrl"
              />
            </div>
          </ModalBody>
          <ModalFooter className="gap-3">
            <Button className="bg-blue-600 rounded p-2" onClick={handleEdit}>
              Update
            </Button>
            <Button color="alternative" onClick={() => setOpenModal(false)}>
              Decline
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default EditReview;
