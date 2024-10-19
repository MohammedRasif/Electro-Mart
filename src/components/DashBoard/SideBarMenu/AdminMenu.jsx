import { NavLink } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser, FaStoreAlt } from "react-icons/fa";
import { AiFillControl } from "react-icons/ai";
import { MdDashboardCustomize } from "react-icons/md";

const AdminMenu = () => {
  return (
    <div className="">
      <div className="">
        <ul className="flex font-serif flex-1 flex-col mt-10 text-gray-400 gap-0 py-3">
          <li className="">
            <NavLink
              to={'dashboard-layout'}
              className={({ isActive }) =>
                `flex mt-1 items-center gap-3 rounded p-3 transition-colors ${
                  isActive ? 'bg-black  text-orange-400 border-l-2 border-l-orange-500' : 'text-gray-400 hover:bg-[#22292F] hover:text-orange-500'
                }`
              }
            >
              <div className="flex items-center self-center">
                <MdDashboardCustomize />
              </div>
              <p className="flex  w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate">
                DashBoard
              </p>
            </NavLink>
          </li>

          <li className=" group relative">
            <NavLink
              className={({ isActive }) =>
                `flex items-center text-[16px] gap-3 rounded p-3 transition-colors ${
                  isActive ? ' ' : 'text-gray-400 hover:bg-[#22292F] hover:text-orange-500'
                }`
              }
              to="#"
            >
              <div className="flex text-md font-semibold items-center self-center">
                <IoAddCircleOutline />
              </div>
              <span className="flex  text-[16px] w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate">
                Product
              </span>
            </NavLink>

            {/* Submenu */}
            <ul className="absolute w-full text-gray-400 top-full hidden group-hover:block bg-[#22292F] shadow-lg rounded-lg p-2">
              <li className="">
                <NavLink
                  to="manageProduct"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-sm font-medium hover:bg-[#22292F] hover:text-orange-500 ${
                      isActive ? 'bg-black border-l-2 border-l-orange-500  text-orange-500' : 'text-gray-400'
                    }`
                  }
                >
                  Manage Product
                </NavLink>
              </li>
              <li className="">
                <NavLink
                  to="addProduct"
                  className={({ isActive }) =>
                    `block py-2 px-4 text-sm font-medium hover:bg-[#22292F] hover:text-orange-500 ${
                      isActive ? 'bg-black border-l-2 border-l-orange-500 text-orange-500' : 'text-gray-400'
                    }`
                  }
                >
                  Add New Product
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="">
            <NavLink
              to={'Order-List'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded p-3 transition-colors ${
                  isActive ? 'bg-black border-l-2 border-l-orange-500 text-orange-500' : 'text-gray-400 hover:bg-[#22292F] hover:text-orange-500'
                }`
              }
            >
              <div className="flex font-semibold text-[16px] items-center self-center">
                <HiOutlineShoppingBag />
              </div>
              <p className="flex text-[16px] w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate ">
                Order
              </p>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              to={'user'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded p-3 transition-colors ${
                  isActive ? 'bg-black border-l-2 border-l-orange-500  text-orange-500' : 'text-gray-400 hover:bg-[#22292F] hover:text-orange-500'
                }`
              }
            >
              <div className="flex  text-[16px] items-center self-center">
                <FaRegUser />
              </div>
              <p className="flex  w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate ">
                User
              </p>
            </NavLink>
          </li>

          <li className="">
            <NavLink
              to={'promotionControl'}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded p-3 transition-colors ${
                  isActive ? 'bg-black border-l-2 border-l-orange-500 text-orange-500' : 'text-gray-400 hover:bg-[#22292F] hover:text-orange-500'
                }`
              }
            >
              <div className="flex text-[16px]  items-center self-center">
                <AiFillControl />
              </div>
            Promotion 
            </NavLink>
          </li>

          <li className="px-3 group relative">
            <Link
              className="flex items-center text-[16px]  gap-3 rounded p-3  transition-colors hover:bg-[#22292F] hover:text-orange-500 focus:bg-orange-50 aria-[current=page]:bg-orange-50 aria-[current=page]:text-emerald-500 "
            >
              <div className="flex text-md  font-semibold  items-center self-center">
                <FaStoreAlt />
              </div>
              <Link
                to="manageStore"
                className="flex font-semibold text-[16px] w-full flex-1 flex-col items-start justify-center gap-0 overflow-hidden truncate"
              >
                Stores
              </Link>
            </Link>

            {/* Submenu */}
            <ul className="absolute  w-full text-gray-400  top-full hidden group-hover:block bg-[#22292F] shadow-lg rounded-lg p-2">
              <li className="px-3 ">
                <Link
                  to="manageStore"
                  className=" block py-2 px-4 text-sm font-medium  hover:bg-[#22292F] hover:text-orange-500">Manage Store</Link>
              </li>
              <li className="px-3">
                <Link
                  to="addStore"
                  className="block py-2 px-4 text-sm font-medium  hover:bg-[#22292F]
                   hover:text-orange-500  aria-[current=page]:bg-orange-50 aria-[current=page]:text-emerald-500"
                >
                  Add Store
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminMenu;
