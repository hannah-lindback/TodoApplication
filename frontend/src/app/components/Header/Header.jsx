import Image from "next/image";

const Header = () => {
  return (
    <header>
      <Image src="/logo.svg" alt="Logo" width={800} height={400}></Image>
    </header>
  );
};

export default Header;
