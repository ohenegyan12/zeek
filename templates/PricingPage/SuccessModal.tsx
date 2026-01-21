import Modal from "@/components/Modal";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

type Props = {
    open: boolean;
    onClose: () => void;
    title: string;
    message: string;
};

const SuccessModal = ({ open, onClose, title, message }: Props) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            classWrapper="max-w-md"
        >
            <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                <div className="size-20 rounded-full bg-green-50 flex items-center justify-center mb-6 border border-green-100">
                    <div className="size-14 rounded-full bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                        <Icon name="check" className="size-8 fill-white" />
                    </div>
                </div>
                <h3 className="text-h4 font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-body-md leading-relaxed mb-8">
                    {message}
                </p>
                <Button
                    isPrimary
                    isMedium
                    onClick={onClose}
                    className="w-full"
                >
                    Great, thanks!
                </Button>
            </div>
        </Modal>
    );
};

export default SuccessModal;
