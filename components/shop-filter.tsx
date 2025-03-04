import { useRouter } from "next/navigation";

export default function FillterForm() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const categoryId = formData.get("categoryId") as string;
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;
    const sortOrder = formData.get("sortOrder") as "asc" | "desc";

    // Update the URL with query parameters
    router.push(`/shop?categoryId=${categoryId}&minPrice=${minPrice}&maxPrice=${maxPrice}&sortOrder=${sortOrder}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="categoryId"
        placeholder="Category ID"
      />
      <input
        type="number"
        name="minPrice"
        placeholder="Min Price"
      />
      <input
        type="number"
        name="maxPrice"
        placeholder="Max Price"
      />
      <select name="sortOrder" title="Sort Order">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button type="submit">Apply Filters</button>
    </form>
  );
}
