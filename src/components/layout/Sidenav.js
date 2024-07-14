
/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { Menu } from "antd";
import { useLocation, NavLink } from "react-router-dom";


import { removeToken } from "../../utill/helpers";
import { BiLogOut, BiTable } from "react-icons/bi";

function Sidenav({ color }) {

  const handleLogOut = () => {
    removeToken();
  };

  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  const items = [
    {
      key: "1",
      servey: "fiche-pack-starters",
      title: "FICHE PACK STARTER",

    },
    {
      key: "2",
      servey: "fiche-pack-vip-premiums",
      title: "FICHE PACK VIP PREMIUM",

    },
    {
      key: "3",
      servey: "pack-training-athletes",
      title: "PACK TRAINING ATHLÈTE",

    },
    {
      key: "4",
      servey: "fiche-pack-specifique-nutritions",
      title: "FICHE PACK SPÉCIFIQUE NUTRITION",

    },
    {
      key: "5",
      servey: "check-up-hebdomadaire-pack-vips",
      title: "CHECK UP HEBDOMADAIRE PACK VIP",

    },
    {
      key: "6",
      servey: "check-up-bi-mensuel-pack-startes",
      title: "CHECK UP BI-MENSUEL PACK STARTE",
    },
    {
      key: "7",
      servey: "bilan-mensuel-pack-vip-premiums",
      title: "BILAN MENSUEL PACK VIP PREMIUM",
    },
    {
      key: "8",
      servey: "bilan-mensuel-pack-starters",
      title: "BILAN MENSUEL PACK STARTER",
    },
    {
      key: "9",
      servey: "bilan-mensuel-pack-nutritions",
      title: "BILAN MENSUEL PACK NUTRITION",
    },
  ];

  return (
    <>
      <Menu theme="dark" className="sidebarNav" style={{ background:"black" }} mode="inline" defaultSelectedKeys={['1']}>
        {
          items.map(item => {
            return <Menu.Item  key={item.key} icon={<BiTable />}>
              <NavLink to={`/tables?collection=${item.servey}`} activeClassName="activeMenuItem">
                {item.title.toLocaleLowerCase()}
              </NavLink>
            </Menu.Item>
          })
        }

        <Menu.Item key="17" icon={<BiLogOut />}>
          <NavLink to="/sign-in" onClick={handleLogOut}>
            <span className="label">Log Out</span>
          </NavLink>
        </Menu.Item>

      </Menu>

    </>
  );
}

export default Sidenav;
