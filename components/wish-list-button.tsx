"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Heart, LoaderCircle } from "lucide-react";
import { createWishList, getActiveUserWishList, getActiveUserWishLists, removeActiveUserWishList } from "@/actions/wishlist";
import { toast } from "sonner";

export default function WishListButton({ product_id }: { product_id: string }) {
  // Check if the product is in wishlist of a logged in user
  const [isInWishlist, setIsInWishlist] = useState(false);
  useEffect(() => {
    const checkIfProductInWishlist = async () => {
      const response = await getActiveUserWishList(product_id);
      if (response.error || !response.data) {
        return;
      }
      setIsInWishlist(true);
    };
    checkIfProductInWishlist();
  }, [product_id]);
  console.log(isInWishlist,"isInWishlist");


  const [isPending, startTransition] = useTransition()
  const handleToggleWishlist = async () => { 
    startTransition(async () => {
      if (isInWishlist) {
        await removeActiveUserWishList(product_id);
      } else {
        await createWishList(product_id);
      }
    });
  };

  //   const [isInWishlist, setIsInWishlist] = useState(false);
  //   const [wishlistId, setWishlistId] = useState<string | null>(null);
  //   const [isLoading, setIsLoading] = useState(false);

  //   // Check if the product is in wishlist
  //   useEffect(() => {
  //     const checkIfProductInWishlist = async () => {
  //       const response = await getActiveUserWishLists();
  //       if (response.error || !response.data) {
  //         return;
  //       }
  //       const wishlistEntry = response.data.find((item) => item.product_id === product_id);
  //       if (wishlistEntry) {
  //         setIsInWishlist(true);
  //         setWishlistId(wishlistEntry.id);
  //       }
  //     };
  //     checkIfProductInWishlist();
  //   }, [product_id]);

  //   // Toggle wishlist
  //   const handleToggleWishlist = async () => {
  //     setIsLoading(true);

  //     try {
  //       if (isInWishlist && wishlistId) {
  //         // Remove from wishlist
  //         const response = await removeActiveUserWishList(wishlistId);

  //         if (response.error) {
  //           toast.error("Failed!", {
  //             description: response.error,
  //           });

  //           setIsInWishlist(false);
  //           setWishlistId(null);
  //           toast.success("Removed!", {
  //             description: "Product removed from wishlist",
  //           });
  //         }
  //       } else {
  //         // Add to wishlist
  //         const response = await createWishList(product_id);
  //         if (response.error) {
  //           toast.error("Failed!", {
  //             description: response.error,
  //           });
  //         } else if (response.data) {
  //           setIsInWishlist(true);
  //           setWishlistId(response.data.id);
  //           toast.success("Success!", {
  //             description: response.msg || "Product added to wishlist",
  //           });
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error toggling wishlist:", error);
  //       toast.error("Error", {
  //         description: "Something went wrong. Please try again.",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggleWishlist}
      disabled={isPending}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}>
      {isPending ? <LoaderCircle className="animate-spin" /> : <Heart className={`${isInWishlist ? "fill-red-500 text-red-500" : ""}`} />}
    </Button>

    // <p>Hello</p>
  );
}
