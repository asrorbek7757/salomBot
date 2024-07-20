import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import "./Mine.css";
import Rasm from '../../assets/ceo.1024x800.png';
import picture from '../../assets/marketing.1024x735.png';
import png from '../../assets/it-support.504x512.png';
import jpg from '../../assets/customer-support-call.1024x915.png';
import img from '../../assets/books.1024x1024.png';
import images from '../../assets/youtube.1024x739.png';
import color from '../../assets/x-letter.1024x1004.png';
import rang from '../../assets/coin-3d.1024x1024.png';

// Modal oynani sozlash
Modal.setAppElement('#root');

const Mine = () => {
  // Ma'lumotlarni localStorage dan olish uchun boshlang'ich ma'lumotlar
  const initialData = [
    { id: 1, title: 'CEO', profitPerHour: 225, level: 1, totalProfit: 42810, image: Rasm },
    { id: 2, title: 'Marketing', profitPerHour: 225, level: 1, totalProfit: 1550, image: picture },
    { id: 3, title: 'IT Team', profitPerHour: 225, level: 1, totalProfit: 1550, image: png },
    { id: 4, title: 'Support team', profitPerHour: 225, level: 1, totalProfit: 1550, image: jpg },
    { id: 5, title: 'Hamster Book', profitPerHour: 225, level: 1, totalProfit: 1550, image: img },
    { id: 6, title: 'HamsterTube', profitPerHour: 225, level: 1, totalProfit: 1550, image: images },
    { id: 7, title: 'X', profitPerHour: 225, level: 1, totalProfit: 1550, image: color },
    { id: 8, title: 'Cointelegraph', profitPerHour: 225, level: 1, totalProfit: 1550, image: rang },
  ];

  const [data, setData] = useState(() => {
    // localStorage dan ma'lumotlarni olish
    try {
      const savedData = localStorage.getItem('mineData');
      return savedData ? JSON.parse(savedData) : initialData;
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return initialData;
    }
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // data o'zgarishida localStorage ga saqlash
    localStorage.setItem('mineData', JSON.stringify(data));
  }, [data]);

  const openModal = (card) => {
    setSelectedCard(card);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleGoAhead = () => {
    setData((prevData) =>
      prevData.map((card) =>
        card.id === selectedCard.id
          ? { ...card, level: card.level + 1, profitPerHour: card.profitPerHour + 210, totalProfit: card.totalProfit + 500 }
          : card
      )
    );
    closeModal();
  };

  return (
    <div className="mine-container">
      <div className="mine-header">Hamster Kombat</div>
      <div className="mine-tabs">
        <div className="tab active">PR&Team</div>
        <div className="tab">Markets</div>
        <div className="tab">Legal</div>
        <div className="tab">Web3</div>
        <div className="tab">Specials</div>
      </div>
      <div className="mine-cards">
        {data.map(item => (
          <div key={item.id} className="card" onClick={() => openModal(item)}>
            <img src={item.image} alt={item.title} className="card-image" />
            <div className="card-title">{item.title}</div>
            <div className="card-profit">Profit per hour: {item.profitPerHour}</div>
            <div className="card-level">lvl {item.level}</div>
            <div className="card-total-profit">{item.totalProfit}</div>
          </div>
        ))}
      </div>
      <div className="mine-footer">
        <div className="footer-tab">Exchange</div>
        <div className="footer-tab active">Mine</div>
        <div className="footer-tab">Friends</div>
        <div className="footer-tab">Earn</div>
        <div className="footer-tab">Airdrop</div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Card Modal" className="modal" overlayClassName="overlay">
        {selectedCard && (
          <div className="modal-content">
            <img src={selectedCard.image} alt={selectedCard.title} className="modal-image" />
            <div className="modal-title">{selectedCard.title}</div>
            <div className="modal-description">
              Kompaniya asoschisi sifatida boshqaruv ko'nikmalaringizni rivojlantiring. Yetakchilik qobiliyatingizni oshiring.
              Jamoangizga eng yaxshi odamlarni jalb qiling.
            </div>
            <div className="modal-profit">Profit per hour: +{210}</div>
            <div className="modal-total-profit">{selectedCard.totalProfit}</div>
            <button className="modal-button" onClick={handleGoAhead}>Go ahead</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Mine;
