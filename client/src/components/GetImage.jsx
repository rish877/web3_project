import axios from "axios";
import { useWeb3Context } from "../contexts/useWeb3Context";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import "./getImage.css"; // Import the CSS file for styling

const GetImage = ({ reload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imagePerPage, setImagePerPage] = useState(2);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const ipfsHashes = await contractInstance.viewFiles(selectedAccount);
        const ipfsHashArray = Object.values(ipfsHashes);

        const url = `http://localhost:3000/api/getImage?page=${currentPage}&limit=${imagePerPage}`;
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            "x-access-token": token,
          },
        };

        const res = await axios.post(url, ipfsHashArray, config);
        const imagesData = res.data.depcryptedImageArr;
        setImages(imagesData);
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Images");
        setLoading(false);
      }
    };

    if (contractInstance) {
      fetchImages();
    }
  }, [contractInstance, currentPage, imagePerPage, selectedAccount, reload]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="image-gallery">
      {!loading ? (
        images.length > 0 ? (
          images.map((imgData, index) => (
            <div className="image-card" key={index}>
              <img
                src={`data:image/jpeg;base64,${imgData}`}
                alt={`Image ${index + 1}`}
              />
              <a
                href={`data:image/jpeg;base64,${imgData}`}
                className="view-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View
              </a>
            </div>
          ))
        ) : (
          <p>No images found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1|| loading}
        >
          <CircleArrowLeft />
        </button>
        <span>{currentPage}</span>
        <button onClick={() => paginate(currentPage + 1)} disabled={loading}>
          <CircleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default GetImage;
