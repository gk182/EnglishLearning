import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer
      className="py-12 px-8"
      style={{ backgroundColor: 'var(--background-light)', color: 'var(--text-gray-dark)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo và mạng xã hội */}
        <div>
          <h1
            className="text-3xl font-extrabold mb-4 flex items-center gap-1"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            E-learning
            <span
              className="w-4 h-4 rounded-full inline-block"
              style={{ backgroundColor: 'var(--color-primary)' }}
            ></span>
          </h1>
          <div className="flex gap-4 text-lg">
            <a
              href="#"
              aria-label="Facebook"
              style={{ color: 'var(--text-gray-medium)' }}
              className="hover:text-indigo-700"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              style={{ color: 'var(--text-gray-medium)' }}
              className="hover:text-indigo-700"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              style={{ color: 'var(--text-gray-medium)' }}
              className="hover:text-indigo-700"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h2
            className="font-semibold mb-4"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            Links
          </h2>
          <ul className="space-y-2" style={{ color: 'var(--text-gray-medium)' }}>
            <li><a href="#" className="hover:text-indigo-700">Home</a></li>
            <li><a href="#" className="hover:text-indigo-700">Courses</a></li>
            <li><a href="#" className="hover:text-indigo-700">Mentor</a></li>
            <li><a href="#" className="hover:text-indigo-700">Group</a></li>
            <li><a href="#" className="hover:text-indigo-700">Testimonial</a></li>
            <li><a href="#" className="hover:text-indigo-700">Docs</a></li>
          </ul>
        </div>

        {/* Other */}
        <div>
          <h2
            className="font-semibold mb-4"
            style={{ color: 'var(--color-primary-dark)' }}
          >
            Other
          </h2>
          <ul className="space-y-2" style={{ color: 'var(--text-gray-medium)' }}>
            <li><a href="#" className="hover:text-indigo-700">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-700">Our Team</a></li>
            <li><a href="#" className="hover:text-indigo-700">Career</a></li>
            <li><a href="#" className="hover:text-indigo-700">Services</a></li>
            <li><a href="#" className="hover:text-indigo-700">Contact</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-4" style={{ color: 'var(--text-gray-dark)' }}>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-primary-dark)' }}>
            <HiOutlineLocationMarker className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            <span>University Education DaNang</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-primary-dark)' }}>
            <HiOutlinePhone className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            <span>+123456789</span>
          </div>
          <div className="flex items-center gap-2" style={{ color: 'var(--color-primary-dark)' }}>
            <HiOutlineMail className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
            <span>info@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div
        className="mt-10 flex flex-col md:flex-row justify-between text-sm"
        style={{ color: 'var(--text-gray-medium)' }}
      >
        <div>@2025 Agency. All Rights Reserved </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-indigo-700">Privacy policy</a>
          <a href="#" className="hover:text-indigo-700">Terms & conditions</a>
        </div>
      </div>
    </footer>
  );
}
