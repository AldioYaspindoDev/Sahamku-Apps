import { CiInstagram } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-12 tracking-widest uppercase">
          Hubungi Saya
        </h3>
        <div className="flex justify-center items-center gap-10 flex-wrap">
          {/* Instagram */}
          <a className="flex items-center gap-2" href="https://www.instagram.com/aldiok__">
            <CiInstagram className="text-2xl" />
            <SocialItem label="@aldiok__"/>
          </a>

          {/* GitHub */}
          <a className="flex items-center gap-2" href="https://github.com/AldioYaspindoDev">
            <FaGithub className="text-2xl" />
            <SocialItem label="@AldioYaspindoDev" />
          </a>

          {/* Email */}
          <a className="flex items-center gap-2" href="mailto:[EMAIL_ADDRESS]">
            <MdOutlineMail className="text-2xl" />
            <SocialItem label="m.aldioyaspindo@gmail.com" />
          </a>

          {/* LinkedIn */}
          <a className="flex items-center gap-2" href="https://www.linkedin.com/in/muhammad-aldio-yaspindo/">
            <FaLinkedin className="text-2xl" />
            <SocialItem label="Muhammad Aldio Yaspindo" />
          </a>
        </div>
        <div className="mt-20 pt-8 border-t border-gray-200 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Sahamku AI Predictor. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

function SocialItem({ label, icon }) {
  return (
    <div className="flex items-center gap-3 text-gray-600 hover:text-rose-800 transition-colors cursor-pointer">
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
