import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const LayoutDropdown = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Menü dışına tıklanınca kapanmasını sağla
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  return (
    <div
      className="position-relative mx-1"
      ref={menuRef}
      onMouseEnter={() => setOpen(true)} // Hover olduğunda açılır
      onMouseLeave={() => {
        // Menü öğelerine tıklanabilmesi için menü dışına tıklama kontrolünü yapıyoruz
        if (!menuRef.current?.contains(event.target as Node)) {
          setOpen(false);
        }
      }} // Hover'dan çıkıldığında kapanır
    >
      <span
        style={{ padding: 0, cursor: "pointer" }}
        className="text-secondary"
        onClick={toggleDropdown} // Tıklama ile de açılıp kapanır
      >
        Admin ▼
      </span>
      {open && (
        <div
          className="position-absolute bg-white border mt-2 p-2 rounded shadow"
          style={{ zIndex: 1000 }}
        >
          <Link to="/admin/users" className="dropdown-item">
            Kullanıcıları Listele
          </Link>
          <Link to="/admin/users/create" className="dropdown-item">
            Kullanıcı Oluştur
          </Link>
          <Link to="/admin/companies" className="dropdown-item">
            Firmaları Listele
          </Link>
          <Link to="/admin/companies/create" className="dropdown-item">
            Firma Oluştur
          </Link>
        </div>
      )}
    </div>
  );
};

export default LayoutDropdown;
