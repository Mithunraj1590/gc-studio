interface NavLink {
  href: string;
  title: string;
}

const headerNavLinks: NavLink[] = [
  { href: "/", title: "Home" },
  { href: "/about", title: "About" },
  { href: "/services", title: "Services" },
  { href: "/works", title: "Works" },
  { href: "/contact", title: "Contact Us" },
];

export default headerNavLinks;

