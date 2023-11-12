"use client";
import ButtonComponent from "@/components/ButtonComponent";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";

// Error components must be Client Components

type error = {
  error: Error & { digest?: string };
  reset: () => void;
};
export default function Error({ error, reset }: error) {
  const router = useRouter();
  return (
    <div className="flex-1 h-80 flex flex-col items-center justify-center gap-10">
      <h2 className="font-bold text-4xl ">Something went wrong!</h2>

      <p className="text-base font-semibold ">{error && error.message}</p>
      <div className="flex items-center gap-10">
        <ButtonComponent
          variant={"default"}
          className="font-semibold flex gap-2 rounded-lg bg-red-400 items-center text-base"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          {" "}
          <RotateCcw
            width={20}
            height={20}
          />
          Try again
        </ButtonComponent>
        <ButtonComponent
          className="font-semibold flex gap-2 rounded-lg bg-green-400 items-center text-base"
          variant={"default"}
          onClick={() => router.back()}
        >
          <ArrowLeft
            width={20}
            height={20}
          />
          Go Back
        </ButtonComponent>
      </div>
    </div>
  );
}
