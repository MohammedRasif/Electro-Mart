import { useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom';
import useRoll from '../../../../Hooks/useRoll';
import RightSideModal from './RightSideModal';
import useRightSideTop from "../../../../Hooks/useRightSideTop";

const RightSideTop = () => {
    const [role] = useRoll();
    const { rightTopImages, refetch } = useRightSideTop();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <div className="relative">
                {rightTopImages.length > 0 ? (
                    rightTopImages.map((rightTopImage, idx) => (
                        <div key={idx}>
                            <img
                                src={rightTopImage.url}
                                alt={`slide ${idx + 1}`}
                                className="w-full lg:min-h-[150px] max-h-[190px] h-[40vh] md:h-auto rounded-lg"
                            />

                            <div className="absolute inset-0 flex flex-col items-start justify-center space-y-4 md:left-5 lg:left-8 px-1">
                                 
                                {/* <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition">
                                    Shop Now
                                </Link> */}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <img
                            src="https://placehold.co/620x190" // Placeholder image
                            alt="Default slide"
                            className="w-full lg:min-h-[150px] max-h-[190px] h-[40vh] md:h-auto rounded-lg"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-center space-y-4 md:left-5 lg:left-8 px-1">
                            <Link to="/" className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition">
                                Shop Now
                            </Link>
                        </div>
                    </div>
                )}

                {role === "admin" && (
                    <span
                        onClick={openModal}
                        className="absolute top-3 right-3 border-2 p-2 rounded-full bg-white/30 hover:bg-slate-700 hover:text-gray-300 cursor-pointer"
                    >
                        <MdModeEdit className="text-xl" />
                    </span>
                )}
            </div>

            {/* Modal */}
            <RightSideModal isOpen={isModalOpen} onClose={closeModal} sendImages={rightTopImages} refetch={refetch} number={1} />
        </div>
    );
};

export default RightSideTop;
