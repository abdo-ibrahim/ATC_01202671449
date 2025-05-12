const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-6 mt-auto">
      <div className="container flex justify-center items-center">
        &copy; {new Date().getFullYear()} <span className=" mx-1 font-[display] text-primary font-bold text-lg"> AreebEvent</span> All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
