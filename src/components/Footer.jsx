import React from 'react'
import Wrapper from './Wrapper'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "News Categories",
      links: [
        { label: "Business", href: "#business" },
        { label: "Technology", href: "#technology" },
        { label: "Entertainment", href: "#entertainment" },
        { label: "Sports", href: "#sports" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Contact", href: "#contact" },
        { label: "Careers", href: "#careers" },
        { label: "Press Kit", href: "#press" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "#help" },
        { label: "API Documentation", href: "#api" },
        { label: "Community", href: "#community" },
        { label: "Newsletter", href: "#newsletter" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "#terms" },
        { label: "Privacy Policy", href: "#privacy" },
        { label: "Cookie Policy", href: "#cookies" },
        { label: "Disclaimer", href: "#disclaimer" }
      ]
    }
  ];

  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
        </svg>
      )
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
        </svg>
      )
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
        </svg>
      )
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="fill-current">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className='bg-linear-to-b from-base-100 to-base-200 border-t border-base-300 mt-16'>
      <Wrapper>
        {/* Main Footer Content */}
        <footer className="py-12 md:py-16">
          {/* Top Section - Logo & Newsletter */}
          <div className="mb-12 pb-8 border-b border-base-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📰</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">QuickNews</h3>
                    <p className="text-sm text-base-content/60">Stay informed, stay ahead</p>
                  </div>
                </div>
                <p className="text-base-content/70 max-w-md">
                  Your trusted source for breaking news, in-depth analysis, and stories that matter. 
                  Delivering quality journalism since {currentYear - 5}.
                </p>
              </div>

              {/* Newsletter Section */}
              <div className="space-y-3">
                <h4 className="font-semibold text-lg">Subscribe to our Newsletter</h4>
                <p className="text-sm text-base-content/60">Get the latest news delivered to your inbox</p>
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="input input-bordered flex-1 text-sm"
                    aria-label="Email for newsletter"
                  />
                  <button className="btn btn-primary whitespace-nowrap">
                    Subscribe
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h5 className="font-semibold text-base-content/90 text-sm uppercase tracking-wide">
                  {section.title}
                </h5>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href} 
                        className="text-sm text-base-content/60 hover:text-primary hover:translate-x-1 inline-block transition-all duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-base-300">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-sm text-base-content/60">
                  © {currentYear} <span className="font-semibold text-base-content">QuickNews</span>. All rights reserved.
                </p>
                <h1><b>Sahitya Ghosh | 8777099335</b></h1>
                <p className="text-xs text-base-content/50 mt-1">
                  Built with ❤️ for news enthusiasts worldwide
                </p>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-base-content/60 mr-2">Follow us:</span>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm btn-circle hover:btn-primary transition-all duration-300 hover:scale-110"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Trust Badges / Additional Info */}
        <div className="pb-6">
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-base-content/50">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Trusted News Source</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default Footer