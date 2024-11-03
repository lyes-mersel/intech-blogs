import React from "react";
import Ping from "./Ping";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

const View = async ({ id }: { id: string }) => {
   const { views: totalViews } = await client
      .withConfig({ useCdn: false })
      .fetch(STARTUP_VIEWS_QUERY, { id });

   //TODO: Implement a way to update the views count

   return (
      <div className="view-container">
         <div className="absolute -top-2 -right-2">
            <Ping />
         </div>
         <p className="view-text">
            <span className="text-black">Views: {totalViews}</span>
         </p>
      </div>
   );
};

export default View;