import Link from "next/link";

function Topbar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-10 w-full px-4 py-1 bg-white shadow-md border-slate-500 dark:bg-[#0c1015] transition duration-700 ease-out">
      <div className="flex justify-between p-4">
        <div className="text-[2rem] leading-[3rem] tracking-tight font-bold text-black dark:text-white">
          Quête JWT
        </div>
        <div className="flex items-center space-x-4 text-lg font-semibold tracking-tight">
          <Link href="/auth/login" className="px-6 py-2 text-black transition duration-700 ease-out bg-white border border-black rounded-lg hover:bg-black hover:border hover:text-white dark:border-white dark:bg-inherit dark:text-white dark:hover:bg-white dark:hover:text-black">
            Se connecter
          </Link>
          <Link href="/auth/register" className="px-6 py-2 text-white transition duration-500 ease-out bg-blue-700 rounded-lg hover:bg-blue-800 hover:ease-in hover:underline">
            S'inscrire
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
