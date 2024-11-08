"use client";

import React, { useState, useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createContent } from "@/lib/actions";
import { useRouter } from "next/navigation";

const BlogForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleFormSubmit = async (
    prevState: { error: string; status: string },
    formData: FormData
  ) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") as string,
        content,
      };

      await formSchema.parseAsync(formValues);

      const result = await createContent(prevState, formData, content);
      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your blog content has been created successfully",
        });

        router.push(`/blog/${result._id}`);
      }

      return result;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      } else {
        toast({
          title: "Error",
          description: "An unexpected error has occurred",
          variant: "destructive",
        });
        return {
          ...prevState,
          error: "An unexpected error has occured",
          status: "ERROR",
        };
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  useEffect(() => {
    setIsLoaded(true);
  }, [setIsLoaded]);

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Blog Title"
        />

        {errors.title && <p className="startup-form_error">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Blog Description"
        />

        {errors.description && (
          <p className="startup-form_error">{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Blog Category (AI, Cybersecurity, Dev...)"
        />

        {errors.category && (
          <p className="startup-form_error">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Blog Image URL"
        />

        {errors.link && <p className="startup-form_error">{errors.link}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="content" className="startup-form_label">
          Content
        </label>

        {isLoaded && (
          <MDEditor
            value={content}
            onChange={(value) => setContent(value as string)}
            id="content"
            preview="edit"
            height={300}
            style={{ borderRadius: 20, overflow: "hidden" }}
            textareaProps={{
              placeholder: "Enter the main text of your blog post",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
        )}

        {errors.content && <p className="startup-form_error">{errors.content}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Blog"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default BlogForm;
