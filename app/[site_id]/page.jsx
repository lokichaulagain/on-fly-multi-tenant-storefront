import { readSiteById } from "@/utils/actions/sites/read-site-id";
import React from "react";

export default async function Page({ params }) {
  // const result = await readSiteById(params?.site_id);
  // console.log(result);
  

  return (
    <div>
      Its a dynamic page for site id
      <hr />
      {/* {result && (
        <div>
          {result?.[0]?.name}
          <hr />
          {result?.[0]?.description}
        </div>
      )} */}
    </div>
  );
}
