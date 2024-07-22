import { RESET_PASSWORD } from "@/requetes/mutations/auth.mutations";
import {
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
} from "@/types/graphql";
import { useMutation } from "@apollo/client";
import Link from "next/link";

function ResetByEmail() {
  const [resetPassword, { data }] = useMutation<
    ResetPasswordMutation,
    ResetPasswordMutationVariables
  >(RESET_PASSWORD);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as { email: string };
    resetPassword({ variables: { email: data.email } });
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div>
        {!data?.resetPassword.resetToken ? (
          <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Indiquez votre email" />
            <input type="submit" />
          </form>
        ) : (
          <div>
            <p>Vérifiez vos emails</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default ResetByEmail;
