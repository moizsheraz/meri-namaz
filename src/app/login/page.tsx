import { signIn } from "@/auth";
import { GeometricPattern } from '../../components/ui/geometric-pattern';
import { CrescentMoon } from '../../components/ui/crescent-moon';
import { IslamicArch } from '../../components/ui/islamic-arch';

const LoginPage = () => {
	return (
		<div className="min-h-screen bg-purple-900 flex flex-col items-center justify-center relative overflow-hidden">
			  <GeometricPattern className="absolute inset-0 opacity-10" />
      <CrescentMoon className="absolute top-8 right-8 w-16 h-16 text-purple-200 opacity-50" />
      <IslamicArch className="absolute top-0 left-1/2 transform -translate-x-1/2 w-64 h-64 text-purple-700 opacity-20" />
      
      <h1 className="text-4xl font-semibold text-white mb-2">Meri Namaz</h1>
      <p className="text-purple-200 mb-8 text-lg">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
			<form
				action={async () => {
					"use server";
					await signIn("google");
				}}
			>
		<button
    type="submit"
    className="bg-white z-50 text-purple-900 text-lg font-medium px-8 py-3 rounded-full shadow-lg hover:bg-purple-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50 active:scale-95 mb-8 flex items-center relative"
>

        <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        Login with Google
      </button>
			</form>
		</div>
	);
};

export default LoginPage;
