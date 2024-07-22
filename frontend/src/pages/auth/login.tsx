import { DemoContext } from "@/contexts/DemoContext";
import useDemoContext from "@/hooks/useDemoContext";
import { LOGIN } from "@/requetes/queries/auth.queries";
import {
  InputLogin,
  LoginQuery,
  LoginQueryVariables,
  useLoginLazyQuery,
} from "@/types/graphql";
import { useLazyQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useContext } from "react";

function Login() {
  const demoContext = useDemoContext();
  // const context = useContext(DemoContext);

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
        <Link href="/auth/reset">mot de passe oublié?</Link>
      </form>

      {demoContext.stateValueWithFilter("f").map((s) => (
        <li key={s}>{s}</li>
      ))}
      <button></button>
    </main>
  );
}

export default Login;
