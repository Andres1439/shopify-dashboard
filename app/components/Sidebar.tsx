import { Link } from "@remix-run/react";
import { useState, useEffect } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      
      // Si la pantalla es menor a 768px, se considera móvil
      if (width <= 768) {
        setIsMobile(true);
        setIsOpen(false);
      } else {
        setIsMobile(false);
        // Si la pantalla es mayor a 1200px, se mantiene abierto
        // Si está entre 768px y 1200px, se cierra
        setIsOpen(width > 1200);
      }
    };

    // Ejecutar al montar el componente
    handleResize();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', handleResize);

    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { 
      name: "Productos", 
      path: "/productos", 
      icon: "inventory_2"
    },
    { 
      name: "Órdenes", 
      path: "/ordenes", 
      icon: "shopping_cart"
    },
    { 
      name: "Chatbot", 
      path: "/chatbot", 
      icon: "chat"
    },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"} ${isMobile ? "mobile" : ""}`}>
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="nav-item"
              title={!isOpen ? item.name : ""}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="nav-icon material-icons">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {isMobile && (
        <button 
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="material-icons">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      )}

      {isMobile && isOpen && (
        <div className="overlay" onClick={() => setIsOpen(false)} />
      )}

      <style>{`
        .sidebar {
          height: 100vh;
          background-color: #f8f9fa;
          padding: 1rem;
          transition: all 0.3s ease;
          position: fixed;
          left: 0;
          top: 0;
          width: 220px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .sidebar.closed {
          width: 50px;
        }

        .sidebar.mobile {
          transform: translateX(0);
        }

        .sidebar.mobile.closed {
          transform: translateX(-100%);
        }

        .mobile-toggle {
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1001;
          background: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .mobile-toggle:hover {
          background-color: #f8f9fa;
        }

        .mobile-toggle .material-icons {
          font-size: 24px;
          color: #333;
        }

        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .sidebar.mobile.open .nav-menu {
          padding-top: 4rem;
        }

        .nav-item {
          padding: 0.6rem 0.75rem;
          text-decoration: none;
          color: #333;
          border-radius: 4px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          white-space: nowrap;
          overflow: hidden;
        }

        .nav-icon {
          font-size: 20px;
          min-width: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-text {
          transition: opacity 0.2s;
        }

        .sidebar.closed .nav-text {
          opacity: 0;
          width: 0;
        }

        .nav-item:hover {
          background-color: #e9ecef;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }

        @media (max-width: 1200px) {
          .sidebar {
            width: 50px;
          }
          
          .sidebar.open {
            width: 220px;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 50px;
          }
          
          .sidebar.open {
            width: 220px;
          }

          .nav-item {
            padding: 0.6rem;
            justify-content: center;
          }

          .sidebar.open .nav-item {
            justify-content: flex-start;
          }

          .mobile-toggle {
            display: flex;
          }
        }

        @media (min-width: 769px) {
          .mobile-toggle {
            display: none;
          }
        }
      `}</style>
    </>
  );
} 