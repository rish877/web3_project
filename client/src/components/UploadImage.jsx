import axios from "axios";
import { useState } from "react";
import { useWeb3Context } from "../contexts/useWeb3Context";
import toast from "react-hot-toast";
import { ImageUp } from "lucide-react";
import "./uploadImage.css"; // Import the CSS file for styling

const UploadImage = ({ reloadEffect }) => {
  const [file, setFile] = useState(null);
  const { web3State } = useWeb3Context();
  const { selectedAccount, contractInstance } = web3State;
  const [loading, setLoading] = useState(false);

  const uploadImageHash = async (ipfsHash) => {
    await toast.promise(contractInstance.uploadFile(selectedAccount, ipfsHash), {
      loading: "Transaction is pending",
      success: "Transaction is successful",
      error: "Transaction failed",
    });
  };

  const handleImageUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      const url = `http://localhost:3000/api/uploadImage`;
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "x-access-token": token,
        },
      };

      const res = await axios.post(url, formData, config);

      toast.success("Image uploaded");
      await uploadImageHash(res.data.ipfsHash);
      setLoading(false);
      reloadEffect();
    } catch (error) {
      console.error(error);
      toast.error("Image Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <p className="upload-title">
        Upload File with Web3's Security
      </p>
      <div className="w-full flex justify-center items-center">
        <input
          type="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
      </div>
      {file ? (
        <button
          onClick={handleImageUpload}
          disabled={loading}
          className="upload-button"
        >
          <ImageUp />
          {loading ? "Uploading..." : "Upload"}
        </button>
      ) : (
        <p className="error-message">
          Choose a File To Upload
        </p>
      )}
    </div>
  );
};

export default UploadImage;
