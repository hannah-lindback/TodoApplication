import Image from "next/image";

/**
 *
 * @returns a header with the logo
 */
const Header = () => {
  return (
    <header>
      <Image
        src="/logo.svg"
        alt="Logo"
        priority={true}
        width={700}
        height={900}
      ></Image>
    </header>
  );
};

export default Header;
