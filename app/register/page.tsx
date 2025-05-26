import RegisterForm from '@/components/registerForm/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FDF4F1] flex flex-col items-center p-8">
      <div className="w-full max-w-md mb-10">
        <Image
                          src="/Image/logo.png"
                          alt="Logo"
                          width={70}
                          height={70}
                          className="object-cover"
                        />
        <RegisterForm />
      </div>
    </div>
  );
}