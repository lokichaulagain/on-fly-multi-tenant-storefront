"use client"
// import { IconFaq } from "@/components/svg-icons/IconFaq";
import { useRef, useState } from "react";
import { ShieldQuestionIcon } from "lucide-react";
import PageBanner from "@/components/page-banner";
const banner1 = "https://miniture.novaworks.net/wp-content/uploads/2023/10/m4_slide_03.jpg";

export default function Page() {
  return (
    <div className="">
      <PageBanner
        image={banner1}
        title="FAQs"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates."
      />

      <div className=" w-full md:w-10/12 mx-auto px-4   mt-12 ">
        <div className="mt-14 md:w-8/12  mx-auto">
          {faqsList.map((item, idx) => (
            <FaqsCard
              key={idx}
              idx={idx}
              faqsList={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const faqsList = [
  {
    q: "What products does Delia Nepal offer?",
    a: "Delia Nepal is the official distributor of Delia Cosmetics in Nepal, offering a wide range of skincare and beauty products designed to enhance your natural beauty.",
  },
  {
    q: "Where can I purchase Delia Cosmetics in Nepal?",
    a: "You can purchase Delia Cosmetics products through our official website [insert website link] or visit authorized retail outlets across Nepal.",
  },
  {
    q: "Are Delia Cosmetics suitable for all skin types?",
    a: "Yes, Delia Cosmetics products are formulated to suit various skin types. We recommend checking product descriptions or consulting with our skincare experts for personalized recommendations.",
  },
  {
    q: "Does Delia Nepal test on animals?",
    a: "No, Delia Cosmetics does not conduct animal testing. We are committed to cruelty-free practices and adhere to international standards.",
  },
  {
    q: "How can I contact Delia Nepal for more information?",
    a: "For any inquiries or assistance, please email us at delianepal@gmail.com Our customer service team is ready to help you with any questions you may have.",
  },
  {
    q: "Can I return or exchange products purchased from Delia Nepal?",
    a: "Please refer to our returns and exchange policy on our website for detailed information regarding returns and exchanges.",
  },
  {
    q: "Does Delia Nepal offer promotions or discounts?",
    a: "Yes, we occasionally offer promotions and discounts on our products. Stay updated by subscribing to our newsletter or following us on social media for the latest offers.",
  },
  {
    q: "How long does shipping take for orders placed through Delia Nepal?",
    a: "Shipping times may vary depending on your location within Nepal. We strive to process and deliver orders promptly. You can track your order status on our website.",
  },
  {
    q: "Is my personal information safe when shopping on Delia Nepal's website?",
    a: "Delia Nepal prioritizes the security and privacy of your personal information. We use secure encryption technology and adhere to strict data protection policies to safeguard your data.",
  },
];

const FaqsCard = (props: any) => {
  const answerElRef = useRef<any>();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}>
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium">
        <div className={`${state ? "text-primary-600" : ""} flex items-center gap-2`}>
          <ShieldQuestionIcon className=" h-6 w-6 text-primary-600" /> {faqsList.q}
        </div>
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-600 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary-600 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}>
        <div>
          <p className="text-gray-500">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};