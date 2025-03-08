import Image from "next/image";

const Header = () => {
  return (
    <header>
      <Image src="/logo.svg" alt="Logo" width={700} height={900}></Image>
    </header>
  );
};

export default Header;
