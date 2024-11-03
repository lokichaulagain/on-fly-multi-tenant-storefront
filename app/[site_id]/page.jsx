import { readSiteById } from "@/utils/actions/sites/read-site-id";
import React from "react";



export default async function Page({ params }) {
  const result = await readSiteById(params?.site_id);

  return (
    <div>
      Its a dynamic page for site id
      <hr />
      {result && (
        <div>
          {result?.[0]?.site_name}
          <hr />
          {result?.[0]?.site_description}
        </div>
      )}
    </div>
  );
}

