import { useState } from "react";
import AdminMenu from "./AdminMenu/AdminMenu";
import { Link } from "react-router-dom";
import logo_1 from '../../assets/images/logo_1.png'

const SideBar = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false)
    return (
        <>
       
        {/*  <!-- Component: Basic side navigation menu --> */}
        {/*  <!-- Mobile trigger --> */}
        <button
          title="Side navigation"
          type="button"
          className={`visible fixed right-0 top-6 z-40 order-10 block h-10 w-10 self-center rounded bg-white opacity-100 lg:hidden ${
            isSideNavOpen
              ? "visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45 "
              : ""
          }`}
          aria-haspopup="menu"
          aria-label="Side navigation"
          aria-expanded={isSideNavOpen ? " true" : "false"}
          aria-controls="nav-menu-1"
          onClick={() => setIsSideNavOpen(!isSideNavOpen)}
        >
          <div className="absolute top-1/2 left-1/2 w-6 -translate-x-1/2 -translate-y-1/2 transform">
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
            ></span>
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
            ></span>
            <span
              aria-hidden="true"
              className="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
            ></span>
          </div>
        </button>
       
  
        {/*  <!-- Side Navigation --> */}
        <aside
          id="nav-menu-1"
          aria-label="Side navigation"
          className={`fixed top-0 bottom-0 left-0 z-40 flex w-64 flex-col border-r border-r-slate-200 bg-white transition-transform lg:translate-x-0 ${
            isSideNavOpen ? "translate-x-0" : " -translate-x-full"
          }`}
        >
       
          <Link to={'/'}>
          <img src={logo_1} alt=""  className="w-48 text-center mx-auto"/>
          
          </Link>
          <nav
            aria-label="side navigation"
            className="flex-1 divide-y divide-slate-100 overflow-auto"
          >
           
           {/* admin menu */}
           <AdminMenu />

          </nav>
       
        </aside>
  
        {/*  <!-- Backdrop --> */}
        <div
          className={`fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-900/20 transition-colors sm:hidden ${
            isSideNavOpen ? "block" : "hidden"
          }`}
          onClick={() => setIsSideNavOpen(false)}
        ></div>
        {/*  <!-- End Basic side navigation menu --> */}
      </>
    );
};

export default SideBar;