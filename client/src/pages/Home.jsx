import { useWeb3Context } from "../contexts/useWeb3Context";
import UploadImage from "../components/UploadImage";
import GetImage from "../components/parent";
import { useState, useEffect } from "react";
import './styles.css';

const Home = () => {
    const [reload, setReload] = useState(false);
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const imageUrls = [
      'https://crypto.news/app/uploads/2024/02/crypto-news-Avalanche-C-chain-clogged-option02-880x525.png',
      'https://www.pymnts.com/wp-content/uploads/2019/06/kaleido-blockchain-enterprise-decentralized.jpg',

      'https://media.licdn.com/dms/image/D4D12AQES8jk5Ixo5Mw/article-cover_image-shrink_720_1280/0/1687351790052?e=2147483647&v=beta&t=QkxkFf_x7ed1O_Y0tp0StD2qSze-aqHCcPRIyWh27eI',

     'https://img.freepik.com/premium-photo/abstract-3d-rendering-red-black-cubes-dark-background-closeup-red-glowing-blockchain-network-with-blocks-ai-generated_538213-3840.jpg',

      'https://img.freepik.com/premium-photo/photo-blockchain-network-full-length-photo_778780-16973.jpg',
      'https://t3.ftcdn.net/jpg/01/79/80/58/360_F_179805859_HE169UhQRVyiw231W5wJpfla0n3BDhwK.jpg'
  ];
    useEffect(() => {
        setBackgroundImageUrl(imageUrls[currentImageIndex]);

        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval);
    }, [currentImageIndex, imageUrls]);

    const reloadEffect = () => {
        setReload(!reload);
    };

    const containerStyle = {
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        transition: 'background-image 0.5s ease-in-out'
    };

    return (
        <div className="relative h-full w-screen flex flex-col justify-center items-center mt-8 px-4 container" style={containerStyle}>
            <UploadImage reloadEffect={reloadEffect} />
            <GetImage reload={reload} />
        </div>
    );
};

export default Home;
