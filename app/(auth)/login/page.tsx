import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", {
          redirectTo: "/",
        });
      }}
    >
      <section>
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
          <div className="grid grid-cols-1">
            <div className="w-full max-w-lg mx-auto my-4 bg-white dark:bg-gray-800 shadow-xl rounded-xl">
              <div className="p-6 lg:text-center">
                <span className="mb-8 text-xs font-semibold tracking-widest text-blue-600 dark:text-white uppercase">
                  Login
                </span>
                <div className="mt-6 flex justify-center items-center">
                  <Button
                    type="submit"
                    variant="outline"
                    className="flex gap-2 rounded-full dark:bg-white dark:text-black"
                  >
                    <Image
                      src="/google-icon.png"
                      alt="Google icon"
                      width={20}
                      height={20}
                    />
                    Signin with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
