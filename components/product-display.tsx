
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";

type Props = {
  product: any;
};

export default async function ProductDisplay({ product }: Props) {
  // const [selectedImage, setSelectedImage] = useState(product.thumbnail);

  // const handleImageClick = (image: string) => {
  //   setSelectedImage(image);
  // };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Image
          src={product.thumbnail}
          alt="product"
          height={500}
          width={1000}
          className="md:h-[70vh] object-cover"
        />
        {/* <Carousel className="w-full mt-2">
          <CarouselContent>
            {[product.media1, product.media2, product.media3, product.media4].map((item, index) => (
              <CarouselItem
                key={index}
                className={`p-1 basis-1/4 ${selectedImage === item ? "border border-orange-500" : "border border-white"}`}
                onClick={() => handleImageClick(item || product.thumbnail)}
                
                >
                <div className="">
                  <Image
                    src={item || product.thumbnail}
                    alt="product"
                    height={1000}
                    width={1000}
                    className="object-cover cursor-pointer "
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel> */}
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <div className="flex items-center gap-2">
          <Rating
            style={{ maxWidth: 90 }}
            readOnly
            value={4.5}
          />
          <span className="text-xs">(3 customer reviews)</span>
        </div>
        <div>
          <span className="text-2xl font-medium">Rs. 120.00</span>
          <span className="line-through ml-2">$150.00</span>
        </div>
        <Separator />
        <div>Product categories and tags work in much the same way as normal categories and tags you have when writing posts in WordPress. They can be created, edited, and selected at any time.</div>
      </div>
    </div>
  );
}