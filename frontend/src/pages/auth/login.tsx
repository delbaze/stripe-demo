import { LOGIN } from "@/requetes/queries/auth.queries";
import { InputLogin, LoginQuery, LoginQueryVariables, useLoginLazyQuery } from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";

function Login() {
  const router = useRouter();
  // const [login, { data, error }] = useLoginLazyQuery()
  const [login, { data, error }] = useLazyQuery<
    LoginQuery,
    LoginQueryVariables
  >(LOGIN);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as InputLogin;
    if (data.email && data.password) {
      login({
        variables: { infos: { email: data.email, password: data.password } },
        onCompleted(data) {
          if (data.login.success) {
            router.push("/");
          }
        },
      });
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <form onSubmit={handleSubmit}>
        <h1 className="font-bold text-lg mb-8">Connexion</h1>
        <div>
          <input type="text" name="email" placeholder="Indiquez votre email" />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Indiquez votre mot de passe"
          />
        </div>
        <input type="submit" />
        <div>
          <span className="text-red-500">{error?.message}</span>
          {data?.login.success ? (
            <span className="text-blue-500">{data?.login?.message}</span>
          ) : (
            <span className="text-red-500">{data?.login?.message}</span>
          )}
        </div>
      </form>
    </main>
  );
}

export default Login;
