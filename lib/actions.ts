"use server";

import { auth } from "@/auth";
import slugify from "slugify";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";

export const createContent = async (
  state: { error: string; status: string },
  form: FormData,
  content: string
) => {
  const session = await auth();
  if (!session) {
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key != "content")
  );
  const slug = slugify(title as string, { lower: true, strict: true });
  try {
    const blog = {
      title,
      description,
      category,
      image: link,
      slug: {
        _type: "slug",
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      content,
    };
    const result = await writeClient.create({ _type: "blog", ...blog });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.error(error);
    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};
