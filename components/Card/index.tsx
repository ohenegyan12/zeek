import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";
import Percentage from "@/components/Percentage";

type Props = {
    className?: string;
    item: {
        title: string;
        value: string;
        percentage: number;
        image: string;
        tooltip: string;
    };
};

const Card = ({ className, item }: Props) => (
    <div
        className={`p-4 rounded-2xl bg-primary-500 text-white shadow-sm ${className || ""}`}
    >
        <div className="flex justify-between items-center mb-4">
            <div className="flex justify-center items-center size-10 rounded-[0.625rem] bg-white/10">
                <Image
                    className="w-5 opacity-100 brightness-0 invert"
                    src={item.image}
                    width={40}
                    height={40}
                    alt=""
                />
            </div>
            <Tooltip className="ml-1.5 !fill-primary-200 hover:!fill-white" content={item.tooltip} place="top" />
        </div>
        <div className="mb-1 text-primary-100">{item.title}</div>
        <div className="flex justify-between items-center">
            <div className="text-body-xl font-semibold text-white">{item.value}</div>
            <Percentage value={item.percentage} />
        </div>
    </div>
);

export default Card;
