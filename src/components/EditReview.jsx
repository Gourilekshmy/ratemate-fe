import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { getReviews, getSingleReview, updateReview } from "../services/AllApi";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const EditReview = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reviewDetails, setReviewDetails] = useState({
    company: "",
    category: "",
    imageUrl: "",
    productName: "",
    price: "",
    comment: "",
  });

  let { id } = useParams();
  console.log(id)

  // useEffect(() => {
  //   handleEdit();
  // }, []);

  const getReview = async () => {
      let token = localStorage.getItem("token");
  
      let reqheader = { Authorization: `Bearer ${token}` };
      let apiResponse = await getSingleReview(id, reqheader);
      console.log(apiResponse)
      setReviewDetails(apiResponse.data);
    };

  const handleEdit = async () => {
    let token = localStorage.getItem("token");
    let reqheader = { Authorization: `Bearer ${token}` };

    try {
      await updateReview(id, reviewDetails, reqheader);
      alert("Successfully Updated");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => {
            getReview();
            setOpenModal(true);
          }}
        >
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
                value={reviewDetails.category}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Category "
              />
              <input
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    company: e.target.value,
                  })
                }
                value={reviewDetails.company}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Company Name"
              />
              <input
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    productName: e.target.value,
                  })
                }
                value={reviewDetails.productName}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Edit Product Name"
              />
              <input
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    price: e.target.value,
                  })
                }
                value={reviewDetails.price}
                className="w-full p-2 rounded border"
                type="text"
                placeholder="Price"
              />
              <input
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    imageUrl: e.target.value,
                  })
                }
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
