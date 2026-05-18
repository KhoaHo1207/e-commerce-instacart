import { footerData } from "@/assets/assets";
import Logo from "./logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-app-green text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo className="mb-4 text-white" />

            <p className="mb-4 text-sm text-white/70">
              {footerData.brand.description}
            </p>

            <div className="flex gap-3">
              {footerData.brand.socials.map((social, index) => (
                <a
                  href={social.link}
                  key={index}
                  className="flex-center size-9 rounded-lg bg-white/10 hover:bg-white/2"
                >
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerData.sections.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-sm font-semibold uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, index) => (
                  <li key={index}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-white/70 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Contact Us</h3>
            <ul className="space-y-3">
              {footerData.contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index} className="flex gap-3 text-sm text-white/70">
                    <Icon className="size-4 text-white" />
                    {item.text}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-white/50">{footerData.bottom.copyright}</p>

          <div className="flex gap-4">
            {footerData.bottom.links.map((link, index) => (
              <a
                href={link.href}
                key={index}
                className="text-xs text-white/50 hover:text-white/70"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
