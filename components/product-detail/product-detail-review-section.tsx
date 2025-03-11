import { Star } from "lucide-react";
import { SignedIn } from "@clerk/nextjs";
import moment from "moment";
import { Reviews } from "@/lib/db/schema";
import { CreateReviewDialog } from "./create-review-dialog";

interface ProductReviewsProps {
  product_id: string;
  reviews: Reviews[];
}

export async function ProductDetailReviewSection({ product_id, reviews }: ProductReviewsProps) {
  const getStarDisplay = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"}`}
      />
    ));
  };

  const stats = {
    averageRating: 4.5,
    totalReviews: 100,
    ratingPercentages: {
      1: 10,
      2: 20,
      3: 30,
      4: 40,
      5: 50,
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(stats?.averageRating) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              Based on {stats?.totalReviews} {stats?.totalReviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
        <SignedIn>
          <CreateReviewDialog product_id={product_id} />
        </SignedIn>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-2">
          <div className="space-y-3">
            {/* Star breakdown */}
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                className="flex items-center"
                key={star}>
                <span className="w-16 text-sm text-muted-foreground">{star} stars</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${stats?.ratingPercentages[star as 1 | 2 | 3 | 4 | 5]}%` }}></div>
                </div>
                <span className="w-12 text-sm text-muted-foreground text-right">{stats?.ratingPercentages[star as 1 | 2 | 3 | 4 | 5]}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-3 space-y-6">
          {reviews?.length === 0 ? (
            <div className="text-center py-8 border rounded-lg">
              <p className="text-muted-foreground">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            reviews?.map((review: Reviews) => (
              <div
                className="border-b pb-6"
                key={review.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{review.user_id || "Anonymous User"}</h4>
                    <div className="flex items-center mt-1">
                      <div className="flex">{getStarDisplay(review.rating)}</div>
                      <span className="ml-2 text-xs text-muted-foreground font-medium">Verified Purchase</span>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">{moment(review.created_at).format("DD MMM YYYY")}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.review}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
