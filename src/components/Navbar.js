import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { ConfigProvider, Button, Popover } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import Paragraph from "antd/es/skeleton/Paragraph";
import { UserOutlined } from "@ant-design/icons";
import axios from 'axios'

const items = [
  {
    key: "/",
    label: "Overview",
  },
  {
    key: "/select",
    label: "Coin",
  },
  {
    key: "/api",
    label: "API",
  },
  {
    key: "/startegy",
    label: "Strategy",
  },
  {
    key: "/account",
    label: "Account",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const noNavbarPath = ["/login", "/register"];

  const logout = () => {
    localStorage.removeItem("user")
    setOpen(false)
    navigate('/login')
  }

  const login = () => {
    setOpen(false)
    navigate('/login')
  }

  useEffect(() => {
    console.log(localStorage.getItem("user"))
  
  }, [])
  

  return (
    <div
      className={`w-full flex justify-center relative ${noNavbarPath.includes(pathname) ? "hidden" : ""
        }`}
    >
      <div className="flex space-x-8 text-gray-600 m-5 mb-0">
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                margin: 0,
              },
            },
          }}
        >
          <Tabs
            activeKey={pathname}
            items={items}
            onChange={(key) => {
              navigate(key);
            }}
            className="mb-0"
          />
        </ConfigProvider>
      </div>
      <div className="absolute right-0 mr-12 mt-7">
        <Popover
          placement="bottom"
          trigger="click"
          open={open}
          content={
            <div>
              <p> {localStorage.getItem('user') !== null ?
                <div>
                  <Button className="px-16" onClick={() => logout()}> LOG OUT </Button>

                </div>
                :
                <Button className="px-16" onClick={() => login()}> LOG IN </Button>}</p>
            </div>
          }
        >
          <Button type='link' className="flex justify-center" onClick={() => setOpen(!open)}><UserOutlined className="text-black mr-7 text-lg" /></Button>
        </Popover>
      </div>
    </div>
  );
};

export default Navbar;
