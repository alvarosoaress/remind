import { useCallback, useState } from 'react';
import HomeIcon from '../../assets/icons/HomeIcon';
import { SideBarModel } from './SideBarModel';
import Logo from '../../assets/images/logo.png';
import PartialLogo from '../../assets/images/partialLogo.png';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import useUser from '../../context/UserContextHook';
import toast from 'react-hot-toast';

export function SideBar() {
  const storagedOpen = JSON.parse(localStorage.getItem('sideBarOpen')) || false;
  const [open, setOpen] = useState(storagedOpen);

  const { logout } = useUser();

  function handleLogout() {
    logout();
    toast.success('Conta desconectada!');
  }

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
    localStorage.setItem('sideBarOpen', Boolean(!open));
  }, [open]);

  return (
    <aside
      className={`relative w-[40vw] h-screen bg-[#F9F8FE] p-4 pt-2 md:w-[20vw] lg:w-[10vw] ${!open && '!w-[12vw] md:!w-[5vw] lg:!w-[3vw] !p-[4px] flex flex-col items-center'}`}
    >
      <img
        src={open ? Logo : PartialLogo}
        className={`mb-4 ${open && 'object-contain md:w-[125px] md:h-[50px]'}`}
        alt=""
      />

      <button
        className="absolute w-[4px] h-[20px] bg-subtleBlack right-3 top-1/2 rounded-xl hover:scale-125 md:w-[6px] md:h-[24px]"
        onClick={() => handleOpen()}
      />

      <nav
        className={`flex flex-col justify-between h-[92%] ${open && 'pl-2'}`}
      >
        <div className="flex flex-col gap-4">
          <SideBarModel.Item
            Icon={HomeIcon}
            text="Recebidas"
            href="/recebidas"
            open={open}
          />
          <SideBarModel.Item
            Icon={HomeIcon}
            text="Enviadas"
            href="/enviadas"
            open={open}
          />
          <SideBarModel.Item
            Icon={HomeIcon}
            text="Usuários"
            href="/u"
            open={open}
          />
        </div>

        <button
          className="w-fit gap-2 flex items-center text-[#E61010] hover:font-medium hover:scale-110"
          onClick={() => handleLogout()}
        >
          <LogoutIcon /> Sair
        </button>
      </nav>
    </aside>
  );
}
