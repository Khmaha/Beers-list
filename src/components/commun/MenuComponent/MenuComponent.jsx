import { Menu } from "antd";
import {
  MoreOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const MenuComponent = () => (
  <Menu mode="horizontal" defaultSelectedKeys={["mail"]}>
    <Menu.SubMenu key="SubMenu" icon={<MoreOutlined />}>
      <Menu.Item key="two" icon={<AppstoreOutlined />}>
        AJouter au panier
      </Menu.Item>
      <Menu.Item key="three" icon={<AppstoreOutlined />}>
        Afficher détails
      </Menu.Item>
    </Menu.SubMenu>
  </Menu>
);

export default MenuComponent;
